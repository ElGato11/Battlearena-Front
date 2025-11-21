import { Personaje } from "./personaje";

export interface Sala{
    id: number,
    nombre: string,
    anfitrion: number,
    contrincante: number | null,
    pAnfitrion: Personaje | null,
    pContrincante: Personaje | null,
}