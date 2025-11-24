import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { personajeRequest } from '../request/personaje.request';

@Injectable({ providedIn: 'root' })
export class PersonajeService {
  private apiUrl = 'http://localhost:8080/personaje';
  constructor(private http: HttpClient) {}

 crear(idUsuario: number, body: personajeRequest) {
  return this.http.post(`${this.apiUrl}/crear/${idUsuario}`, body);
}

  
}
