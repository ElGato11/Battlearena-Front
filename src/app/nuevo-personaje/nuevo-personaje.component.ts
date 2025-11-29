import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PersonajeService } from '../utils/service/personaje.service';
import { UserService } from '../utils/service/user.service';
import { personajeRequest } from '../utils/request/personaje.request';

@Component({
  selector: 'app-nuevo-personaje',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './nuevo-personaje.component.html',
  styleUrl: './nuevo-personaje.component.css'
})
export class NuevoPersonajeComponent {
  creationError = '';
  creationMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private personajeService: PersonajeService,
    private userService: UserService
  ) {}

  personajeForm = this.fb.nonNullable.group({
  nombre: ['', [Validators.required, Validators.minLength(3)]],
  vigor: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
  fuerza: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
  destreza: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
  inteligencia: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
  sabiduria: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
  carisma: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
});



guardar() {
  if (this.personajeForm.invalid) return;

  const usuario = this.userService.currentUser();
  if (!usuario?.idUsuario) {
    this.creationError = 'No hay usuario logueado';
    return;
  }

  const body: personajeRequest = this.personajeForm.getRawValue();

  this.personajeService.crear(usuario.idUsuario, body).subscribe({
    next: () => this.router.navigateByUrl('/mis-personajes'),
    error: e => this.creationError = 'No se pudo guardar'
  });
}




  cancelar() {
    this.router.navigateByUrl('/mis-personajes');
  }
}
