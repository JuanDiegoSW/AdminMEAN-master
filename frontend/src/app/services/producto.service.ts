import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


import { Producto } from '../models/producto.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor( private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarProductos(){
    const url = `${ base_url }/productos`;
      return this.http.get( url, this.headers )
                .pipe(
                  map( (resp: {productos: Producto[] }) => resp.productos )
                );
  }
}


