import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../utils/service/user.service';
import { Sala } from '../utils/model/sala';
import { Personaje } from '../utils/model/personaje';
import { HttpClient } from '@angular/common/http';
import SockJS from 'sockjs-client/dist/sockjs';
import { Client } from '@stomp/stompjs';
import { SalasService } from '../utils/service/salas.service';

@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent {
  sala: Sala | null = null;
  personajes: Personaje[] = [];
  personajeSeleccionado: Personaje | null = null;
  stompClient!: Client;
  nombreSala!: string;
  usuarioId!: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private salasService: SalasService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.nombreSala = this.route.snapshot.paramMap.get('nombre')!;
    this.usuarioId = this.userService.currentUser()!.idUsuario;
    this.salasService.cargarSala(this.nombreSala)
      .subscribe(s => {
        this.sala = s;
        console.log(this.sala);
      });
    this.cargarPersonajes();
    this.conectarWS();
  }

  cargarPersonajes() {
    this.userService.getMisPersonajes(this.usuarioId)
      .subscribe(p => this.personajes = p);
  }

  conectarWS() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 500
    });

    this.stompClient.onConnect = () => {
      this.stompClient.subscribe(`/topic/sala/${this.nombreSala}`, msg => {
        this.sala = JSON.parse(msg.body);
      });
    };

    this.stompClient.activate();
  }

  seleccionarPersonaje() {
    if (!this.sala || !this.personajeSeleccionado) return;

    const body = {
      nombreSala: this.nombreSala,
      usuarioId: this.usuarioId,
      personajeId: this.personajeSeleccionado.id
    };

    this.http.post('http://localhost:8080/salas/seleccionar-personaje', body)
      .subscribe();
  }
}
