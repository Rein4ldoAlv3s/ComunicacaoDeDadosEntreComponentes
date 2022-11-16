import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-emissor',
  templateUrl: './emissor.component.html',
  styleUrls: ['./emissor.component.css']
})
export class EmissorComponent  implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  enviarViaService(musica: string) {
    this.appService.alterarMusica(musica);
  }
}
