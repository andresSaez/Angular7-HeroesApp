import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  fireUrl = 'https://heroesapp-b89be.firebaseio.com/heroes.json';
  heroeUrl = 'https://heroesapp-b89be.firebaseio.com/heroes/';

  constructor(
    private http: HttpClient
  ) { }

  getHeroe( key$: string ) {

    let url = `${ this.heroeUrl }${ key$ }.json`;
    return this.http.get( url)
      .pipe(map(res => JSON.stringify(res)) );
  }

  getHeroes( ) {

    return this.http.get( this.fireUrl )
      .pipe(map(res => JSON.stringify(res)) );
  }

  nuevoHeroe( heroe: Heroe ) {

    let body = JSON.stringify( heroe );
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post( this.fireUrl, body, { headers: headers } ).pipe(map( (res: any) => {
        console.log(res);
        return res;
      }));
  }

  actualizarHeroe( heroe: Heroe, key$: string ) {

    let body = JSON.stringify( heroe );
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let url = `https://heroesapp-b89be.firebaseio.com/heroes/${ key$ }.json`;
    return this.http.put( url, body, { headers: headers } ).pipe(map( (res: any) => {
        console.log(res);
        return res;
      }));
  }

  borrarHeroe( key$: string ) {
    let url = `${ this.heroeUrl }${ key$ }.json`;

    return this.http.delete( url).pipe(map( res => {
      return JSON.stringify(res);
    }));
  }
}
