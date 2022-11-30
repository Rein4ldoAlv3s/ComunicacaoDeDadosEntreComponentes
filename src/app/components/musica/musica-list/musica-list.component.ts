import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Artista } from 'src/app/services/artista';
import { ArtistaService } from 'src/app/services/artista.service';
import { Musica } from 'src/app/services/musica';
import { MusicaService } from 'src/app/services/musica.service';
import { Table } from 'primeng/table'


@Component({
  selector: 'app-musica-list',
  templateUrl: './musica-list.component.html',
  styleUrls: ['./musica-list.component.css']
})
export class MusicaListComponent implements OnInit {

  artista: Artista = {
    nome: '',
    generoMusical: '',
    paisDeOrigem: '',
    integrantes: '',
    id: 0
  };

  musica: Musica = {
    nome: '',
    letraDaMusica: '',
    traducao: '',
    artista: this.artista
  }

  musicas: Musica[] = []

  cols: any[] = [];

  displayBasic: boolean | undefined;

  temporary: number = 0;

  @Output() editEventEmitter = new EventEmitter()
  
  musicaShowDialog: boolean = false;

  @ViewChild('dt') dt: Table | undefined;
  

    constructor(
      private primengConfig: PrimeNGConfig,
      private confirmationService: ConfirmationService,
      private router: Router,
      private messageService: MessageService,
      private musicaService: MusicaService
    ) { }

    ngOnInit() {
        this.getAllMusicas();
        this.cols = [
          { field: 'nomeMusica', header: 'Música', width: '20%' },
          { field: 'NomeArtista', header: 'Artista', width: '20%' },
          { field: 'integrantes', header: 'Integrantes', width: '20%' },
          { field: 'id', header: '', width: '20%' },
      ];
      this.primengConfig.ripple = true;
    }

    getAllMusicas(){
      this.musicaService.getAll().subscribe(data => this.musicas = data);
    }                                     
    

    editMusica(id: number){
      this.editEventEmitter.emit(id)
    }

    getEventValue($event:any) :string {
      return $event.target.value;
    } 
   
  
   

    deleteById(musica: Musica) {
      this.confirmationService.confirm({
          target:  event.target,
          message: 'Deseja excluir ' + musica.nome + "?",
          acceptLabel: 'Sim',
          rejectLabel: 'Não',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.musicaService.deleteById(musica.id).subscribe(musica => this.getAllMusicas());
            this.messageService.add({
              severity: "success",
              detail: musica.nome + " foi deletado."
            });
          }
      });
  }

  

    showMusica(id: number){
      this.musicaService.findById(id).subscribe(data => this.musica = data);
      this.musicaShowDialog = true;
    }

}