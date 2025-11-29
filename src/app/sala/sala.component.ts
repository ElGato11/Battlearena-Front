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
  stompClient?: CompatClient;
  nombreSala: string = "";
  inicioCombate:boolean = false;
  resultado = false;
  hpAPorcentaje: number= 100;
  hpCPorcentaje: number= 100;
  hpA = this.sala?.hpA;
  hpC = this.sala?.hpC;
  maxHpA = 20;
  maxHpC = 20;
  terminado = false;
  esAnfitrion = false;
  combateActivoEnServidor = false;
  miTurno = false;

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
        this.maxHpA = s.hpA!;
      });
      if(this.userService.currentUser()?.nombre == this.sala?.anfitrion) this.esAnfitrion = true;
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
    if(this.stompClient)this.stompClient.subscribe(`/topic/sala/${this.nombreSala}`, msg => {
      this.sala = JSON.parse(msg.body);
      console.log(this.sala, this.sala?.panfitrion == null);
      if (this.sala?.panfitrion == null)this.salir();
      this.miTurno= !this.miTurno;
      if(this.sala?.hpA == 0 || this.sala?.hpC == 0)this.terminado = true;
    });
  });
}
  combatir(){
    if(this.sala && this.sala.pcontrincante && this.sala.panfitrion){
      this.inicioCombate = true;
      this.maxHpC = this.sala.hpC!;
    }
    this.combateActivoEnServidor = true;
    const anfitrionEmpieza = this.sala!.panfitrion!.destreza > this.sala!.pcontrincante!.destreza;
    this.miTurno = (this.esAnfitrion === anfitrionEmpieza);

  }

  salir(){
    if(this.userService.currentUser()?.nombre === this.sala?.anfitrion){
      this.salasService.borrarSala(this.nombreSala).subscribe(()=> this.router.navigateByUrl(`/lista-salas`));
    }else if(this.userService.currentUser()?.nombre === this.sala?.contrincante){
      this.salasService.borrarContrincante(this.nombreSala).subscribe(()=> this.router.navigateByUrl(`/lista-salas`));
    }
    this.router.navigateByUrl("/lista-salas");
    
    
  }
  iniciarCombate(){

  }
  cerrarCombate(){

  }

  atacar(){
  }
}
