import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../utils/service/user.service';
import { Sala } from '../utils/model/sala';
import { HttpClient } from '@angular/common/http';
import { SalasService } from '../utils/service/salas.service';
import { WebSocketService } from '../utils/service/webSocket.service';
import { CompatClient } from '@stomp/stompjs';

@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent implements OnDestroy {
  sala: Sala | null = null;
  stompClient!: CompatClient;
  nombreSala!: string;
  estoyListo: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private salasService: SalasService,
    private http: HttpClient,
    private webSocketService: WebSocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nombreSala = this.route.snapshot.paramMap.get('nombre')!;
    this.salasService.cargarSala(this.nombreSala)
      .subscribe(s => {
        this.sala = s;
        console.log(this.sala);
      });
    this.conectarWS();
  }
  ngOnDestroy(): void {
  if (this.stompClient && this.stompClient.active) {
    this.stompClient.deactivate();
  }
}

  conectarWS() {
  this.stompClient = this.webSocketService.cliente();
  this.stompClient.debug = () => {};

  this.stompClient.connect({}, () => {
    this.stompClient.subscribe(`/topic/sala/${this.nombreSala}`, msg => {
      this.sala = JSON.parse(msg.body);
    });
  });
}
  combatir(){
    JSON.parse(this.sala!.contrincante);
    JSON.parse(this.sala!.anfitrion);
  }
  salir(){
    this.salasService.borrarSala(this.nombreSala).subscribe(()=> this.router.navigateByUrl(`/lista-salas`));
    
  }
}
