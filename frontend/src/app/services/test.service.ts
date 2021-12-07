import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private http :  HttpClient) { }

    test(){
    //  return this._http.get("").map(result => result);

    const url = `${ base_url }/informes/data1`;
      return this.http.get( url)
              .pipe(
                map( (resp => resp ) ))

    }
}
