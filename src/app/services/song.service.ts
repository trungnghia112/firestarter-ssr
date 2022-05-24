import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private httpOptions = {
    headers: new HttpHeaders({
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
      'X-RapidAPI-Key': '125c172c6dmsh18f74d06513afeap14637ejsn434df44fe384'
    })
  };
  constructor(private http: HttpClient) { }

  fetch(id = 484129036): Observable<any> {
    return this.http.get(`https://shazam.p.rapidapi.com/songs/list-recommendations?key=${id}&locale=en-US`, this.httpOptions).pipe(map((v: any) => v.tracks || []));
  }
  findSongById(id: any): Observable<any> {
    return this.http.get(`https://shazam.p.rapidapi.com/songs/get-details?key=${id}&locale=en-US`, this.httpOptions)
  }
}
