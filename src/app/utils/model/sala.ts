import { Personaje } from "./personaje";
import { Usuario } from "./usuario";

export interface Sala{
    id: number,
    nombre: string,
    anfitrion: string,
    contrincante: string,
    panfitrion: Personaje | null,
    pcontrincante: Personaje | null,
    hpA?: number | null,
    hpC?: number | null,
}