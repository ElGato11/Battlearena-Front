  import { CommonModule } from '@angular/common';
  import { Component } from '@angular/core';
  import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
  import { Router, RouterModule } from '@angular/router';
  import { SalasService } from '../utils/service/salas.service';
  import { UserService } from '../utils/service/user.service';
  import { Sala } from '../utils/model/sala';
import { Personaje } from '../utils/model/personaje';
import { SalaRequest } from '../utils/request/sala.request';

  @Component({
    selector: 'app-nueva-sala',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
    templateUrl: './nueva-sala.component.html',
    styleUrl: './nueva-sala.component.css'
  })
  export class NuevaSalaComponent {
      personajes: Personaje[] = [];
      creationMessage = '';
      creationError = '';

    constructor(private fb: FormBuilder, private salaService: SalasService, private userService: UserService, private router: Router) {}

    salaForm = this.fb.group({
      nombre: [`Sala de ${this.userService.currentUser()?.nombre}`, [Validators.required, Validators.minLength(3)]],
      personajeSeleccionado: [null as Personaje | null,Validators.required]
  });
  ngOnInit(): void{
    this.userService.getMisPersonajes().subscribe(p => {
      this.personajes = p;
    });
  }

  crearSala() {
    this.creationMessage = '';
    this.creationError = '';
    if (this.salaForm.invalid) return;
    const personajeSel = this.salaForm.get('personajeSeleccionado')!.value;
    if (!personajeSel) return;

    const nuevaSala: SalaRequest = {
      nombreSala: this.salaForm.value.nombre!,
      personaje: personajeSel.id,
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
