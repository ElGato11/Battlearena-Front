import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../utils/service/user.service';
import { SalasService } from '../utils/service/salas.service';
import { Sala } from '../utils/model/sala';
import { CompatClient } from '@stomp/stompjs';
import { WebSocketService } from '../utils/service/webSocket.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Personaje } from '../utils/model/personaje';
import { SalaRequest } from '../utils/request/sala.request';

@Component({
  selector: 'app-lista-salas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './lista-salas.component.html',
  styleUrl: './lista-salas.component.css'
})
export class ListaSalasComponent {

  salas: Sala[] = [];
  stompClient!: CompatClient;
  personajes: Personaje[] = [];

  constructor(
    private userService: UserService,
    private salasService: SalasService,
    private webSocketService: WebSocketService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  selecPers = this.fb.nonNullable.group({
    personajeSeleccionado: [null as Personaje | null, Validators.required]
  });

  ngOnInit(): void {
    if (this.userService.currentUser()) {
      this.userService.getMisPersonajes().subscribe(p => {
        this.personajes = p;
      });
      this.cargarDatos();
      this.conectarWS();
    }
  }

  conectarWS() {
    this.stompClient = this.webSocketService.cliente();
    this.stompClient.debug = () => {};
    this.stompClient.reconnectDelay = 5000;

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe("/topic/lista-salas", msg => {
        this.salas = JSON.parse(msg.body);
      });
    });
  }

  cargarDatos(): void {
    if (this.userService.currentUser()) {
      this.salasService.getSalas().subscribe(s => {
        this.salas = s;
      });
    }
  }

  unirse(nombre: string) {
    
    if (this.selecPers.invalid) return;
    const personajeSel = this.selecPers.get('personajeSeleccionado')!.value;

    if (!personajeSel) return;

    const request: SalaRequest = {
      nombreSala: nombre,
      personaje: personajeSel.id
    };

    this.salasService.unirseSala(request).subscribe(s => {
      if(s) this.router.navigateByUrl(`/sala/${nombre}`)
    });
  }
}
