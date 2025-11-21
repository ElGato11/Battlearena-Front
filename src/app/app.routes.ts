import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { SesionUsuarioComponent } from './sesion-usuario/sesion-usuario.component';
import { NuevoPersonajeComponent } from './nuevo-personaje/nuevo-personaje.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { ListaPersonajesComponent } from './lista-personajes/lista-personajes.component';
import { SalaComponent } from './sala/sala.component';
import { ListaSalasComponent } from './lista-salas/lista-salas.component';
import { NuevaSalaComponent } from './nueva-sala/nueva-sala.component';
import { EditarPersonajeComponent } from './editar-personaje/editar-personaje.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'login', component: SesionUsuarioComponent},
    {path: 'crear-personaje', component: NuevoPersonajeComponent},
    {path: 'crear-usuario', component: NuevoUsuarioComponent},
    {path: 'mis-personajes', component: ListaPersonajesComponent},
    {path: 'nuevo-personaje', component: NuevoPersonajeComponent},
    {path: 'lista-salas', component: ListaSalasComponent},
    {path: 'nueva-sala', component: NuevaSalaComponent},
    {path: 'sala/:nombre', component: SalaComponent},
    {path: 'editar-personaje/:id', component: EditarPersonajeComponent}
];
