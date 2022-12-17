import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artista } from './artista';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Imagem } from './imagem';


@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

    baseUrl: string = environment.baseUrlArtista;

    artista: Artista = {
        nome: '',
        generoMusical: '',
        paisDeOrigem: '',
        integrantes: ''
      }

    constructor(private http: HttpClient) { }

    getAll(): Observable<Artista[]>{
        const url = this.baseUrl + "/artistas/";
        return this.http.get<Artista[]>(url);
    }  

    findByNome(nome : string): Observable<Artista[]>{
        const url = this.baseUrl + "/artistas/nomeArtista?nome=" + nome;
        return this.http.get<Artista[]>(url);
    }

    findImagemByNome(nome: string): Observable<Blob> {
        const url = this.baseUrl + "/image/fileSystem/" + nome
        return this.http.get(url, {responseType: 'blob'})
    }

    findById(id : any): Observable<Artista>{
        const url = this.baseUrl + "/artistas/" + id;
        return this.http.get<Artista>(url);
    }

    deleteById(id: any):Observable<Artista>{
        const url = this.baseUrl + "/artistas/" + id;
        return this.http.delete<Artista>(url);
    }

    

    create(formData: FormData): Observable<Artista> {
        const url = this.baseUrl + "/artistas";
        return this.http.post<Artista>(url, formData);
    }

    update(formData: FormData, id: number): Observable<Artista> {
        const url = this.baseUrl + "/artistas/" + id;
        return this.http.put<Artista>(url, formData);
    }

  
}