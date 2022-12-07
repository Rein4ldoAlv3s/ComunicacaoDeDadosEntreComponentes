import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artista } from './artista';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:8080/image/fileSystem/'



  findByNome(nome : string): Observable<any>{
    const url = this.baseUrl + nome;
    return this.http.get<any>(url);
  }

  create(artista: Artista): Observable<Artista> {
    const url = this.baseUrl + "/artistas";
    return this.http.post<Artista>(url, artista);
  }

}
