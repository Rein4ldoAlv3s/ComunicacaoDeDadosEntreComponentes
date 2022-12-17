import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Artista } from 'src/app/services/artista';
import { ArtistaService } from 'src/app/services/artista.service';
import { Router } from '@angular/router';
import { ArtistaListComponent } from '../artista-list/artista-list.component';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { FormControl, Validators } from '@angular/forms';
import { Imagem } from 'src/app/services/imagem';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-artista-cad',
  templateUrl: './artista-cad.component.html',
  styleUrls: ['./artista-cad.component.css']
})
export class ArtistaCadComponent implements OnInit{

  imagem: Imagem = {
    id: 0,
    name: '',
    filePath: '',
    type: ''
  }

  imgUrl: any;
  
  artista: Artista = {
    nome: '',
    generoMusical: '',
    paisDeOrigem: '',
    integrantes: '',
    imagem: this.imagem
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
    
    if(this.formData.has("file") ){
      this.formData.delete("file")
    }

  }

  removerUpload(){
    this.uploadedFiles = []

    if(this.formData.has("file") ){
      this.formData.delete("file")
    }
    
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

 

  
  



  SelectedEventEmitter(artista: Artista): void {
      this.editarButton = true,
      this.cadastrarButton = false,
      this.cancelarButton = true,
      this.artista.integrantes = artista.integrantes,
      this.artista.id = artista.id,
      this.artista.nome = artista.nome,
      this.artista.generoMusical = artista.generoMusical,
      this.artista.paisDeOrigem = artista.paisDeOrigem,
      this.artista.imagem = artista.imagem

      console.log(this.artista.imagem)

      if(this.artista.imagem == null){
        this.uploadedFiles = []
      }

      if(this.artista.imagem != null){

        let filee: Blob
        this.service.findImagemByNome(this.artista.imagem.name)
        .subscribe(imagem => filee = imagem)
        
        let file = new File([filee], this.artista.imagem.name, {type: "image/jpeg", lastModified: Date.now()});

        if(this.formData.has("file") ){
          this.formData.set("file", file, file.name)
        }
        else{
          this.formData.append( "file", file, file.name);   
        }

        this.uploadedFiles = []
        this.uploadedFiles.push(file)

      }
     

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

    if(this.artista.imagem != null){
      this.ReqJson["imagem"] = this.artista.imagem
    }

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


    this.service.update(this.formData, this.artista.id).subscribe(resposta => {
      this.artistaListComponent.getAllArtistas(),
      this.messageService.add({severity:'success', detail: this.artista.nome + ' foi atualizado!'});
      this.cancel()
      this.submitted = true;
      this.cancelarButton = false
      this.editarButton = false
      this.cadastrarButton = true
      this.uploadedFiles = []
      if(this.formData.has("file") ){
        this.formData.delete("file")
      }
      this.artista.imagem = null
      
    }, err => {
      if(err.error.error.match('Erro')){
        this.messageService.add({severity:'error', detail: 'O artista não foi cadastrado. Erro na validação dos campos!'});
      }
      if(err.error.error.match('Informe outra imagem')){
        this.messageService.add({severity:'error', detail: err.error.error});
      }
    });
    
  }

  
  

}