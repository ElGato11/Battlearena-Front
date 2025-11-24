import { Personaje } from "./personaje";
import { Usuario } from "./usuario";

export interface Sala{
    id: number,
    nombre: string,
    anfitrion: string,
    contrincante: string,
    pAnfitrion: Personaje | null,
    pContrincante: Personaje | null,
}