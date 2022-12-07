import { Imagem } from "./imagem";

export interface Artista {
    nome?:string;
    generoMusical?:string;
    paisDeOrigem?:string;
    integrantes?: string;
    id?:number;
    imagem?: Imagem;
}