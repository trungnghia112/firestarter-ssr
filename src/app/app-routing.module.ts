import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongResolver } from './services/song.resolver';
import { SongsDetailsComponent } from './songs/details/details.component';
import { SongsComponent } from './songs/songs.component';

const routes: Routes = [
  {
    path: "songs",
    component: SongsComponent

  },
  {
    path: 'songs/:id',
    component: SongsDetailsComponent,
    resolve: {
      data: SongResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
