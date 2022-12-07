import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TableModule} from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import { ArtistaCadComponent } from './components/artista/artista-cad/artista-cad.component';
import { ArtistaListComponent } from './components/artista/artista-list/artista-list.component';
import { HeaderComponent } from './components/header/header.component';
import {AccordionModule} from 'primeng/accordion';     
import {InputTextModule} from 'primeng/inputtext';
import {ToolbarModule} from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ToastModule} from 'primeng/toast';
import { InputTextareaModule } from "primeng/inputtextarea";
import { RippleModule } from 'primeng/ripple';


import {RouterModule} from '@angular/router';


import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HomeComponent } from './components/home/home.component';
import { AlbumComponent } from './components/album/album.component';
import { MusicaListComponent } from './components/musica/musica-list/musica-list.component';
import { AutoCompleteModule } from "primeng/autocomplete";
import { MusicaCadComponent } from './components/musica/musica-cad/musica-cad.component';
import { MusicaLetraComponent } from './components/musica/musica-letra/musica-letra.component';
import { FooterComponent } from './components/footer/footer.component';
import { YouTubePlayerModule } from '@angular/youtube-player';


@NgModule({
  declarations: [
    AppComponent,
    ArtistaCadComponent,
    ArtistaListComponent,
    HeaderComponent,
    HomeComponent,
    AlbumComponent,
    MusicaListComponent,
    MusicaCadComponent,
    MusicaLetraComponent,
    FooterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    AccordionModule,
    InputTextModule,
    ToolbarModule,
    ConfirmPopupModule,
    ToastModule,
    InputTextareaModule,
    RippleModule,
    RouterModule,
    CalendarModule,
    SliderModule,
    DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    YouTubePlayerModule

  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
