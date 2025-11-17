import { Combatiente } from "./combatiente";

export interface Sala{
    id: number,
    nombre: string,
    anfitrion: number,
    contrincante: number,
    pAnfitrion: Combatiente,
    pContrincante: Combatiente,
}