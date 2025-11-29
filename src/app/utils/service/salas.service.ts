import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from '../model/sala';
import { Usuario } from '../model/usuario';
import { SalaRequest } from '../request/sala.request';

@Injectable({ providedIn: 'root' })
export class SalasService {
  private apiUrl = 'http://localhost:8080/salas';
  constructor(private http: HttpClient) {}
  
  getSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.apiUrl}/lista-salas`);
  }
  crearSala(body: SalaRequest): Observable<Sala> {
    this.setSalaActual(body.nombreSala);
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
    const data = localStorage.getItem("user");
  if (!data) return;

  const usuario: Usuario = JSON.parse(data);
  usuario.salaActual = nombre;
  localStorage.setItem("user", JSON.stringify(usuario));
  }
  existe(nombre: string){
    return this.http.get<boolean>(`${this.apiUrl}/existe/${nombre}`);
  }
  cargarSala(nombre: string){
    return this.http.get<Sala>(`${this.apiUrl}/${nombre}`);
  }
  borrarSala(nombre: string){
    return this.http.delete<void>(`${this.apiUrl}/borrar/${nombre}`)
  }
  unirseSala(body: SalaRequest){
    return this.http.post<boolean>(`${this.apiUrl}/unirse`,body)
  }
  borrarContrincante(nombre: string){
    return this.http.delete<void>(`${this.apiUrl}/borrarContrincante/${nombre}`)
  }
}
