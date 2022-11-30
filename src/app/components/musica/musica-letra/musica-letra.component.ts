import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artista } from 'src/app/services/artista';
import { Musica } from 'src/app/services/musica';
import { MusicaService } from 'src/app/services/musica.service';

@Component({
  selector: 'app-musica-letra',
  templateUrl: './musica-letra.component.html',
  styleUrls: ['./musica-letra.component.css']
})


export class MusicaLetraComponent implements OnInit {

  IdMusica: number;

  artista: Artista = {
    id: 0,
    nome: '',
    generoMusical: '',
    paisDeOrigem: '',
    integrantes: ''
  }

  musica: Musica = {
    id: 0,
    nome: '',
    letraDaMusica: '',
    traducao: '',
    artista: this.artista
  }

  

  constructor(private service: MusicaService, 
    private route: ActivatedRoute) 
  { }


  ngOnInit(): void {
    this.getLetraMusica()
  }

  getLetraMusica(){
    this.IdMusica = this.route.snapshot.params['id'];
    this.service.findById(this.IdMusica).subscribe(musica => {
      this.musica = musica
    })
  }

}
