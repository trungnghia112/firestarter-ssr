import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from "@angular/platform-browser";
import { SongService } from './song.service';
import { SeoService } from './seo.service';

@Injectable({
  providedIn: 'root'
})
export class SongResolver implements Resolve<any> {
  constructor(
    private songService: SongService,
    private transferState: TransferState,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: any) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    const songId = route.params['id'];

    const SONG_KEY = makeStateKey<any>("courseKey-" + songId);

    if (this.transferState.hasKey(SONG_KEY)) {

      const course = this.transferState.get(SONG_KEY, null);

      this.transferState.remove(SONG_KEY);

      return of(course);
    }
    else {
      return this.songService.findSongById(songId)
        .pipe(
          first(),
          tap(song => {
            if (isPlatformServer(this.platformId)) {
              this.transferState.set(SONG_KEY, song);
            }
            this.seoService.generateTags({
              title: song.title,
              description: song.subtitle,
              image: song.images.background,
            })
          })
        );
    }
  }
}
