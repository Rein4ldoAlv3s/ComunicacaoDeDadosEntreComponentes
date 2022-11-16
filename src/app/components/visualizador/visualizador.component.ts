import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-visualizador',
  templateUrl: './visualizador.component.html',
  styleUrls: ['./visualizador.component.css']
})
export class VisualizadorComponent implements OnInit {

  musicaSubscription: Subscription = new Subscription;
  musicaCount = 0;

  constructor(private appService: AppService) { }

  enviarViaService(musica: string) {
    this.appService.alterarMusica(musica);
  }

  ngOnInit() {  
    this.musicaSubscription = this.appService.obterMusica()
      .subscribe(valor => {
        this.musicaCount++;
      });
  }

  get musica(): string {
    return this.appService.obterMusica().value;
  }
}