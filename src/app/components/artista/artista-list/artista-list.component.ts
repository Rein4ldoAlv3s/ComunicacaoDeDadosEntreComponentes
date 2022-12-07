import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Artista } from 'src/app/services/artista';
import { ArtistaService } from 'src/app/services/artista.service';
import { Imagem } from 'src/app/services/imagem';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-artista-list',
  templateUrl: './artista-list.component.html',
  styleUrls: ['./artista-list.component.css']
})
export class ArtistaListComponent implements OnInit {

  
  artistas: Artista[] = [];

  imagem: Imagem = {
    id: 0,
    name: '',
    filePath: '',
    type: ''
  }

  artista: Artista = {
    nome: '',
    generoMusical: '',
    paisDeOrigem: '',
    integrantes: '',
    id: 0,
    imagem: this.imagem
  };

  

  

  cols: any[] = [];

  displayBasic: boolean | undefined;

  temporary: number = 0;

  nomeImagem: string;

  @Output() editEventEmitter = new EventEmitter()
  
  artistaShowDialog: boolean = false;
  

    constructor(
      private artistaService: ArtistaService,
      private primengConfig: PrimeNGConfig,
      private confirmationService: ConfirmationService,
      private router: Router,
      private messageService: MessageService,
      private storageService: StorageService
    ) { }

    ngOnInit() {
        this.getAllArtistas();
        this.cols = [
          { field: 'nome', header: 'Nome', width: '20%' },
          { field: 'generoMusical', header: 'Gênero Musical', width: '20%' },
          { field: 'paisDeOrigem', header: 'País de Origem', width: '20%' },      
          { field: 'integrantes', header: 'Integrantes', width: '20%' },      
          { field: 'id', header: '', width: '20%' },      
      ];
      this.primengConfig.ripple = true;
    }

    getAllArtistas(){
      this.artistaService.getAll().subscribe(data => this.artistas = data);
    }
    
    getImagem(pathImagem: string){
      console.log('dfdfsd')
      this.storageService.findByNome(pathImagem)
        .subscribe(imagem => {
          imagem
        }, err => {
          return null
        })
    }

    editArtista(artista: Artista){
      this.editEventEmitter.emit(artista)     
    }

    deleteById(artista: Artista) {
      this.confirmationService.confirm({
          target:  event.target,
          message: 'Deseja excluir ' + artista.nome + "?",
          acceptLabel: 'Sim',
          rejectLabel: 'Não',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.artistaService.deleteById(artista.id).subscribe(artista => {
              this.getAllArtistas()
            }, err => {
              this.messageService.add({
                severity: "error",
                detail: "O artista não pode ser deletado pois possui músicas associadas."
              });
            }, () => {
              this.messageService.add({
                severity: "success",
                detail: artista.nome + " foi deletado."
              });
            }
            );
            
          }
      });
    }


    showArtista(id: number){
      this.artistaService.findById(id).subscribe(data => this.artista = data);
      this.artistaShowDialog = true;
    }

}