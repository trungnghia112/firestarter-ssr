import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-songs-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class SongsDetailsComponent implements OnInit, AfterViewInit {
  song: any;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.song = this.route.snapshot.data["data"];
  }

  ngAfterViewInit() {
  }
}
