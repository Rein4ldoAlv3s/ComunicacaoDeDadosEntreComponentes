import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {Musica} from './musica';

@Injectable({providedIn: 'root'})
export class MusicaService {

    baseUrl : string = environment.baseUrlArtista;

    constructor(private http : HttpClient) {}

    getAll(): Observable <Musica[]> {
        const url = this.baseUrl + "/musicas/";
        return this.http.get<Musica[]>(url);
    }

    findById(id : any): Observable <Musica> {
        const url = this.baseUrl + "/musicas/" + id;
        return this.http.get<Musica>(url);
    }

    deleteById(id : any): Observable <Musica> {
        const url = this.baseUrl + "/musicas/" + id;
        return this.http.delete<Musica>(url);
    }

    create(musica : Musica): Observable <Musica> {
        const url = this.baseUrl + "/musicas";
        return this.http.post<Musica>(url, musica);
    }

    update(musica : Musica): Observable <Musica> {
        const url = this.baseUrl + "/musicas/" + musica.id;
        return this.http.put<Musica>(url, musica);
    }

}
