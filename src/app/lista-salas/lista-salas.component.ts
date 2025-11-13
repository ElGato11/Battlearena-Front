import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Usuario } from '../utils/model/usuario';
import { UserService } from '../utils/service/user.service';
import { SalasService } from '../utils/service/salas.service';
import { Sala } from '../utils/model/Sala';

@Component({
  selector: 'app-lista-salas',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './lista-salas.component.html',
  styleUrl: './lista-salas.component.css'
})
export class ListaSalasComponent {
  salas: Sala[] = [];
  usuario!: Usuario | null;
constructor(
  private userService: UserService,
  private SalasService: SalasService 
){}

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos(): void {
    this.usuario = this.userService.currentUser();
    if(this.usuario){
      this.SalasService.getSalas(this.usuario?.idUsuario).subscribe(s => this.salas = s);
    }    
  }
}
