import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje } from '../model/personaje';

@Injectable({ providedIn: 'root' })
export class PersonajeService {
  private apiUrl = 'http://localhost:8080/personaje';
  constructor(private http: HttpClient) {}
  crear(body: any): Observable<Personaje> {
    return this.http.post<Personaje>(`${this.apiUrl}/crear`, body);
  }
  
}
