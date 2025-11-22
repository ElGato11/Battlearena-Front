  import { CommonModule } from '@angular/common';
  import { Component } from '@angular/core';
  import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
  import { Router, RouterModule } from '@angular/router';
  import { SalasService } from '../utils/service/salas.service';
  import { UserService } from '../utils/service/user.service';
  import { CrearSalaRequest } from '../utils/request/crearSala.request';
  import { Sala } from '../utils/model/sala';

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

    salaForm = this.fb.group({
      nombre: [`Sala de ${this.userService.currentUser()?.nombre}`, [Validators.required, Validators.minLength(3)]],
      anfitrion: [this.userService.currentUser()?.idUsuario]
  });

  crearSala() {
    this.creationMessage = '';
    this.creationError = '';
    if (this.salaForm.invalid) return;

    const nuevaSala: CrearSalaRequest = {
      nombre: this.salaForm.value.nombre!,
      id: this.salaForm.value.anfitrion!
    };

    this.salaService.crearSala(nuevaSala).subscribe({
      next: (sala: Sala) => {
        this.router.navigateByUrl(`/sala/${sala.nombre}`);
      },
      error: e => {
        const msg = e?.error || 'No se pudo crear la sala';
        this.creationError = typeof msg === 'string' ? msg : 'No se pudo crear la sala';
      }
    });
  }
  }
