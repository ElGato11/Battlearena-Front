import { Component } from '@angular/core';
import { UserService } from '../utils/service/user.service';
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
constructor(
  private userService: UserService
){}

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos(): void {
    if(this.userService.currentUser()){
      this.userService.getMisPersonajes().subscribe(p => this.personajes = p);
      
    }  
  }
}
