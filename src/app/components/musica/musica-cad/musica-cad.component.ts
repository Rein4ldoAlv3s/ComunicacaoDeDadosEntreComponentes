import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Artista } from 'src/app/services/artista';
import { ArtistaService } from 'src/app/services/artista.service';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { FormControl, Validators } from '@angular/forms';
import { MusicaListComponent } from '../musica-list/musica-list.component';
import { MusicaService } from 'src/app/services/musica.service';
import { Musica } from 'src/app/services/musica';

@Component({
  selector: 'app-musica-cad',
  templateUrl: './musica-cad.component.html',
  styleUrls: ['./musica-cad.component.css']
})
export class MusicaCadComponent implements OnInit{


  artista: Artista = {
    nome: '',
    generoMusical: '',
    paisDeOrigem: '',
    integrantes: ''
  }

  musica: Musica = {
    nome: '',
    letraDaMusica: '',
    traducao: '',
    artista: this.artista
  }

  value2: Artista[] = [];

  filteredArtistas: Artista[] = [];

  cadastrarButton: boolean = false;
  cancelarButton: boolean = false;
  editarButton: boolean = false;


  edit: boolean = false;

  @ViewChild(MusicaListComponent)
  private musicaListComponent: MusicaListComponent

  artistas: Artista[] = []

  submitted = true

  constructor(
    private musicaService: MusicaService,
    private router: Router, private messageService: MessageService, 
    private primengConfig: PrimeNGConfig,
    private artistaService: ArtistaService
  ){ 
    
  }

  ngOnInit() {
    this.cadastrarButton = true
  }
  
   changeValue(musica: Musica){
    console.log(musica)
    if(musica.nome === '' && musica.artista === '' && musica.letraDaMusica === '' && musica.traducao === ''){
      musica.id = 0
      this.cancelarButton = false
      this.editarButton = false
      this.cadastrarButton = true
    }
    else{
      this.cancelarButton = true
    }
  }

  create(){
    console.log("criando")
    console.log(this.musica)
    this.musicaService.create(this.musica).subscribe(data => {
      this.musicaListComponent.getAllMusicas(),
      this.submitted = true;
      this.cancelarButton = false
      

    }, err => {
      this.cancel()
      this.cancelarButton = false
      console.log(err)
      this.submitted = false;
      if(err.error.error.match('Erro')){
        this.messageService.add({severity:'error', detail: 'A música não foi cadastrada. Erro na validação dos campos!'});
      }
      if(err.error.error.match('informe um nome diferente')){
        this.messageService.add({severity:'error', detail: err.error.error});
      }
    }, () => {
      this.messageService.add({severity:'success', detail: this.musica.nome + ' foi cadastrado!'});
      this.cancel()
    }
    );
    
    
  }

  movieSelectedEventEmitter(musicaId: number): void {
    this.editarButton = true,
    this.cadastrarButton = false
    this.cancelarButton = true
    this.edit = true
    this.musicaService.findById(musicaId).subscribe(musica => this.musica = musica)
    console.log(this.musica)
  }


  cancel(){
   this.musica.id = 0;
   this.musica.nome = '';
   this.musica.artista = null;
   this.musica.letraDaMusica = '';
   this.musica.traducao = '';
   this.submitted = true;
   this.cadastrarButton = true;
   this.cancelarButton = false;
   this.editarButton = false
  }

  editButton(){
    console.log('editando')
    this.musicaService.update(this.musica).subscribe(resposta => {
    this.musicaListComponent.getAllMusicas()
    this.edit = false
    this.messageService.add({severity:'success', detail: this.musica.nome + ' foi atualizado!'});
    this.submitted = true;
    this.cancelarButton = false
    this.cancel()
    }, err =>{
      if(err.error.error.match('Já existe')){
        this.messageService.add({severity:'error', detail: err.error.error});
      }
    });
    
  }

  searchMusica(event: any) {
    let query = event.query;

    this.artistaService.findByNome(query).subscribe(artista => {
      this.filteredArtistas = artista
    })
    
    
  }
  

}
