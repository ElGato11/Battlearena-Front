import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { SesionUsuarioComponent } from './sesion-usuario/sesion-usuario.component';
import { NuevoPersonajeComponent } from './nuevo-personaje/nuevo-personaje.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { ListaPersonajesComponent } from './lista-personajes/lista-personajes.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'login', component: SesionUsuarioComponent},
    {path: 'crear-personaje', component: NuevoPersonajeComponent},
    {path: 'crear-usuario', component: NuevoUsuarioComponent},
    {path: 'mis-personajes', component: ListaPersonajesComponent},
    {path: 'nuevo-personaje', component: NuevoPersonajeComponent}
];
