import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Artista } from 'src/app/services/artista';
import { ArtistaService } from 'src/app/services/artista.service';
import { Router } from '@angular/router';
import { ArtistaListComponent } from '../artista-list/artista-list.component';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-artista-cad',
  templateUrl: './artista-cad.component.html',
  styleUrls: ['./artista-cad.component.css']
})
export class ArtistaCadComponent {
  
  artista: Artista = {
    nome: '',
    generoMusical: '',
    paisDeOrigem: '',
    integrantes: ''
  }


  edit: boolean = false;

  @ViewChild(ArtistaListComponent)
  private artistaListComponent: ArtistaListComponent

  artistas: Artista[] = []

  submitted = true

  constructor(private service: ArtistaService,
    private router: Router, private messageService: MessageService, 
    private primengConfig: PrimeNGConfig
  ) 
  { }

  create(){
    this.service.create(this.artista).subscribe(data => {
      this.artistaListComponent.getAllArtistas(),
      console.log(this.artista),
      this.messageService.add({severity:'success', detail: this.artista.nome + ' foi cadastrado!'});
      this.artista = {},
      this.submitted = true;

    }, err => {
      console.log(err)
      this.submitted = false;
      if(err.error.error.match('Erro')){
        this.messageService.add({severity:'error', detail: 'O artista não foi cadastrado. Erro na validação dos campos!'});
      }
      if(err.error.error.match('Já existe')){
        this.messageService.add({severity:'error', detail: err.error.error});
      }
    }
    );
    
    
  }

  movieSelectedEventEmitter(artista: Artista): void {
      this.edit = true,
      this.artista.integrantes = artista.integrantes,
      this.artista.id = artista.id,
      this.artista.nome = artista.nome,
      this.artista.generoMusical = artista.generoMusical,
      this.artista.paisDeOrigem = artista.paisDeOrigem
  }


  cancel(){
   this.artista.nome = '';
   this.artista.generoMusical = '';
   this.artista.paisDeOrigem = '';
   this.artista.integrantes = '';
   this.edit = false
   this.submitted = true;
  }

  editButton(){
    console.log(this.artista)

    this.service.update(this.artista).subscribe(resposta => {
      this.artistaListComponent.getAllArtistas(),
      this.artista = {}
    });
    this.edit = false
    this.messageService.add({severity:'success', detail: this.artista.nome + ' foi atualizado!'});
    this.submitted = true;
  }

  
  

}