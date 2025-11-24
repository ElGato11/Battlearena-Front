import { Personaje } from "../model/personaje";
import { personajeRequest } from "./personaje.request";

export interface SalaRequest{
    "nombreSala": string,
    "personaje": number,
}