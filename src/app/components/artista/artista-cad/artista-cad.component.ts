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
export class ArtistaCadComponent implements OnInit{
  
  artista: Artista = {
    nome: '',
    generoMusical: '',
    paisDeOrigem: '',
    integrantes: ''
  }

  cadastrarButton: boolean = false;
  cancelarButton: boolean = false;
  editarButton: boolean = false;

  @ViewChild(ArtistaListComponent)
  private artistaListComponent: ArtistaListComponent

  artistas: Artista[] = []


  submitted = true

  fileToUpload: File | null = null;


  constructor(private service: ArtistaService,
    private router: Router, private messageService: MessageService, 
    private primengConfig: PrimeNGConfig
  ) 
  { }
  
  ngOnInit(): void {
    this.cadastrarButton = true
  }

  public formData = new FormData();
  ReqJson: any = {};

  uploadedFiles: any[] = [];

  file: File //imagem do artista

  myUploader(event: any) {
    
    this.uploadedFiles = []

    for(let file of event.files) {
      this.file = file
      if(this.formData.has("file") ){
        this.formData.set("file", this.file, this.file.name)
      }
      else{
        this.formData.append( "file", this.file, this.file.name);      
      }
      this.uploadedFiles.push(file);
    }
    
  }

  cancelarUpload(){
    this.uploadedFiles = []
    this.formData.delete("file")
  }

  removerUpload(){
    this.uploadedFiles = []
    this.formData.delete("file")
  }
  
 


  create(){
    this.ReqJson["nome"] = this.artista.nome
    this.ReqJson["generoMusical"] = this.artista.generoMusical
    this.ReqJson["paisDeOrigem"] = this.artista.paisDeOrigem
    this.ReqJson["integrantes"] = this.artista.integrantes

    if(this.formData.has('artista')){
      this.formData.set('artista', JSON.stringify( this.ReqJson ))
    }
    else{
      this.formData.append('artista', JSON.stringify( this.ReqJson ))
    }

    this.service.create(this.formData).subscribe(data => {
      this.artistaListComponent.getAllArtistas(),
      this.messageService.add({severity:'success', detail: this.artista.nome + ' foi cadastrado!'});
      this.artista = {},
      this.submitted = true;
      this.cancelarButton = false
      this.uploadedFiles = []
      this.cancel()
    }, err => {
      this.cancel()
      this.uploadedFiles = []
      this.cancelarButton = false
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
      this.editarButton = true,
      this.cadastrarButton = false
      this.cancelarButton = true
      this.artista.integrantes = artista.integrantes,
      this.artista.id = artista.id,
      this.artista.nome = artista.nome,
      this.artista.generoMusical = artista.generoMusical,
      this.artista.paisDeOrigem = artista.paisDeOrigem
  }


  cancel(){
   this.artista.id = 0;
   this.artista.nome = '';
   this.artista.generoMusical = '';
   this.artista.paisDeOrigem = '';
   this.artista.integrantes = '';
   this.submitted = true;
   this.cadastrarButton = true;
   this.cancelarButton = false;
   this.uploadedFiles = []
   this.editarButton = false

  }

  changeValue(artista: Artista){
    if(artista.nome === '' && artista.generoMusical === '' && artista.paisDeOrigem === '' && artista.integrantes === ''){
      artista.id = 0
      this.cancelarButton = false
      this.editarButton = false
      this.cadastrarButton = true
    }
    else{
      this.cancelarButton = true;
    }
    
  }

  editButton(){

    this.service.update(this.artista).subscribe(resposta => {
      this.artistaListComponent.getAllArtistas(),
      this.artista = {}
    });
    this.messageService.add({severity:'success', detail: this.artista.nome + ' foi atualizado!'});
    this.submitted = true;
    this.cancelarButton = false
    this.editarButton = false
    this.cadastrarButton = true
  }

  
  

}