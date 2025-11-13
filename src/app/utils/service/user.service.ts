import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../request/login.request";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { Usuario } from "../model/usuario";
import { Personaje } from "../model/personaje";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  setUser(u: Usuario) {
    localStorage.setItem('user', JSON.stringify(u));
  }
     private apiUrl: string = 'http://localhost:8080/usuario';

    constructor(private http: HttpClient) {}

  getMisPersonajes(id: Number): Observable<Personaje[]> {
    return this.http.get<any[]>(`${this.apiUrl}/personajes/${id}`);
  }
  login(req: LoginRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, req);
  }

  registrar(body: { nombre: string; clave: string; admin?: boolean }) {
    return this.http.post<Usuario>(`${this.apiUrl}/crear`, body);
  }

  
  logout() {
    localStorage.removeItem('user');
  }

  currentUser(): Usuario | null {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) as Usuario : null;
  }

  isLoggedIn(): boolean {
    return this.currentUser() != null;
  }

  isAdmin(): boolean {
    return this.currentUser()?.admin === true;//esto es por que puede ser null
  }

}
