import { Artista } from "./artista";

export interface Musica {
    id?:number;
    nome?:string;
    letraDaMusica?:string;
    traducao?:string;
    artista?:Artista
}