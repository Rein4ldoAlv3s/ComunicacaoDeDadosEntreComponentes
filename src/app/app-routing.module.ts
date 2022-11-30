import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './components/album/album.component';
import { ArtistaCadComponent } from './components/artista/artista-cad/artista-cad.component';
import { HomeComponent } from './components/home/home.component';
import { MusicaLetraComponent } from './components/musica/musica-letra/musica-letra.component';
import { MusicaCadComponent } from './components/musica/musica-cad/musica-cad.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artistas', component: ArtistaCadComponent },
  { path: 'musicas', component: MusicaCadComponent },
  { path: 'musicas/:id', component: MusicaLetraComponent },
  { path: 'albums', component: AlbumComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
