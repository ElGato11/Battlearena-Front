import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje } from '../model/personaje';
import { CrearPersonajeRequest } from '../request/crearPersonaje.request';

@Injectable({ providedIn: 'root' })
export class PersonajeService {
  private apiUrl = 'http://localhost:8080/personaje';
  constructor(private http: HttpClient) {}

 crear(idUsuario: number, body: CrearPersonajeRequest) {
  return this.http.post(`${this.apiUrl}/crear/${idUsuario}`, body);
}

  
}
