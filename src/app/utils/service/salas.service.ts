import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from '../model/sala';
import {CrearSalaRequest} from '../request/crearSala.request';
import { Usuario } from '../model/usuario';

@Injectable({ providedIn: 'root' })
export class SalasService {
  private apiUrl = 'http://localhost:8080/salas';
  constructor(private http: HttpClient) {}
  
  getSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.apiUrl}/lista-salas`);
}
  crearSala(body: CrearSalaRequest): Observable<Sala> {
    this.setSalaActual(body.nombre);
    return this.http.post<Sala>(`${this.apiUrl}/crear`, body);
}
  getSalaActual() {
  const data = localStorage.getItem("user");
  if (!data) return null;

  const usuario: Usuario = JSON.parse(data);

  if (!usuario.salaActual || usuario.salaActual.trim() === "") {
    return null;
  }

  return usuario.salaActual.trim();
}
  setSalaActual(nombre: string){
    var usuario: Usuario =JSON.parse(localStorage.getItem("user") || "") ;
    usuario.salaActual = nombre;
    localStorage.setItem("user",JSON.stringify(usuario));
  }
  existe(nombre: string){
    return this.http.get<boolean>(`${this.apiUrl}/existe/${nombre}`);
  }
  cargarSala(nombre: string){
    return this.http.get<Sala>(`${this.apiUrl}/${nombre}`);
  }
}
