import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artista } from './artista';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

    baseUrl: string = environment.baseUrlArtista;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Artista[]>{
        const url = this.baseUrl + "/artistas/";
        return this.http.get<Artista[]>(url);
    }

    findByNome(nome : string): Observable<Artista[]>{
        const url = this.baseUrl + "/artistas/nomeArtista?nome=" + nome;
        return this.http.get<Artista[]>(url);
    }

    findById(id : any): Observable<Artista>{
        const url = this.baseUrl + "/artistas/" + id;
        return this.http.get<Artista>(url);
    }

    deleteById(id: any):Observable<Artista>{
        const url = this.baseUrl + "/artistas/" + id;
        return this.http.delete<Artista>(url);
    }

    create(artista: Artista): Observable<Artista> {
        const url = this.baseUrl + "/artistas";
        return this.http.post<Artista>(url, artista);
    }

    update(artista: Artista): Observable<Artista> {
        const url = this.baseUrl + "/artistas/" + artista.id;
        return this.http.put<Artista>(url, artista);
    }

  
}