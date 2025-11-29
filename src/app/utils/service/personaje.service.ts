import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { personajeRequest } from '../request/personaje.request';
import { Personaje } from '../model/personaje';

@Injectable({ providedIn: 'root' })
export class PersonajeService {
  private apiUrl = 'http://localhost:8080/personaje';
  constructor(private http: HttpClient) {}

  crear(idUsuario: number, body: personajeRequest) {
    return this.http.post<Personaje>(`${this.apiUrl}/crear/${idUsuario}`, body);
}

  borrar(id : number){
    return this.http.delete<void>(`${this.apiUrl}/borrar/${id}`);
  }
  
}
