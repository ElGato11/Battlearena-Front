import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PersonajeService } from '../utils/service/personaje.service';
import { UserService } from '../utils/service/user.service';

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

  personajeForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: [''],
    fuerza: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
    destreza: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
    constitucion: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
    inteligencia: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
    sabiduria: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
    carisma: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
  })!;

  guardar() {
    this.creationError = '';
    this.creationMessage = '';
    if (this.personajeForm.invalid) return;
    const usuario = this.userService.currentUser();
    const nuevoPersonajeBody: any = { ...this.personajeForm.getRawValue() };
    if (usuario?.idUsuario) nuevoPersonajeBody.usuario = { idUsuario: usuario.idUsuario }; //TODO lo cambio en funcion de session guard
    this.personajeService.crear(nuevoPersonajeBody).subscribe({
      next: () => {
        this.creationMessage = 'Guardado correctamente';
        this.router.navigateByUrl('/mis-personajes');
      },
      error: e => {
        this.creationError = typeof e?.error === 'string' ? e.error : 'No se pudo guardar';
      }
    });
  }

  cancelar() {
    this.router.navigateByUrl('/personajes');
  }
}
