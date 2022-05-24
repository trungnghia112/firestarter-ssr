import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SeoService } from '../services/seo.service';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  songs$!: Observable<any[]>;

  constructor(
    private seoService: SeoService,
    private songService: SongService
  ) { }

  ngOnInit(): void {
    this.seoService.generateTags({
      title: "Song recommendations ideas"
    });
    this.songs$ = this.songService.fetch();
  }

}
