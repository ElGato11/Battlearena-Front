import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SalasService } from '../utils/service/salas.service';
import { UserService } from '../utils/service/user.service';

@Component({
  selector: 'app-nueva-sala',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './nueva-sala.component.html',
  styleUrl: './nueva-sala.component.css'
})
export class NuevaSalaComponent {
creationMessage = '';
  creationError = '';

  constructor(private fb: FormBuilder, private salaService: SalasService, private userService: UserService, private router: Router) {}

  userForm = this.fb.group({
    nombre: [`Sala de ${this.userService.currentUser()?.nombre}`, [Validators.required, Validators.minLength(3)]],
    usuario1:
  });
}
