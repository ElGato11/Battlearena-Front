import { Component } from '@angular/core';
import { UserService } from '../utils/service/user.service';
import { Usuario } from '../utils/model/usuario';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Personaje } from '../utils/model/personaje';

@Component({
  selector: 'app-lista-personajes',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './lista-personajes.component.html',
  styleUrl: './lista-personajes.component.css'
})
export class ListaPersonajesComponent {
  personajes: Personaje[] = [];
  usuario!: Usuario | null;
constructor(
  private userService: UserService
){}

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos(): void {
    this.usuario = this.userService.currentUser();
    if(this.usuario){
      this.userService.getMisPersonajes(this.usuario?.idUsuario).subscribe(p => this.personajes = p);
    }   
    console.log(this.personajes);
  }
}
