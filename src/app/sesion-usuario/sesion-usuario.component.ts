import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../utils/request/login.request';
import { UserService } from '../utils/service/user.service';
import { Usuario } from '../utils/model/usuario';

@Component({
  selector: 'app-sesion-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sesion-usuario.component.html',
  styleUrl: './sesion-usuario.component.css'
})
export class SesionUsuarioComponent {
  loginError = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    nombre: ['', Validators.required],
    clave: ['', Validators.required],
  });

  login() {
    if (this.loginForm.invalid) return;
    const req = this.loginForm.value as LoginRequest;
    this.userService.login(req).subscribe({
      next: u => {
        this.userService.setUser(u);
        this.router.navigateByUrl('');
      },
      error: e => {
        this.loginError = typeof e?.error === 'string' ? e.error : 'Credenciales inválidas';
      }
    });
  }

}
