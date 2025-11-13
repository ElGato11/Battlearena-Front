import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../utils/service/user.service';

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent {
  creationMessage = '';
  creationError = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  userForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    clave: ['', [Validators.required, Validators.minLength(4)]],
  });

  crearUsuario() {
    this.creationMessage = '';
    this.creationError = '';
    if (this.userForm.invalid) return;
    const nuevoUsuarioBody = { nombre: this.userForm.value.nombre!, clave: this.userForm.value.clave!, admin: false }; //que el admin se coloque aqui me da regulin
    this.userService.registrar(nuevoUsuarioBody).subscribe({
      next: u => {
        this.creationMessage = 'Cuenta creada. Ya puedes iniciar sesión.';
        setTimeout(() => this.router.navigateByUrl(''), 800);
      },
      error: e => {
        const msg = e?.error || 'No se pudo crear el usuario';
        this.creationError = typeof msg === 'string' ? msg : 'No se pudo crear el usuario';
      }
    });
  }
}
