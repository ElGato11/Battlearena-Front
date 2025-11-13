import { Personaje } from "./personaje";

export interface Sala{
    nombre: string,
    usuario1: number,
    usuario2: number,
    personaje1: Personaje,
    personaje2: Personaje,
}