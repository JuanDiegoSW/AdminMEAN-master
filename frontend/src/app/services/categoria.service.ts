import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Categoria } from '../models/categoria.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  cargarcategorias() {

    const url = `${ base_url }/categorias`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, categorias: Categoria[] }) => resp.categorias )
              );
  }

  crearCategoria( nombre: string ) {

    const url = `${ base_url }/hospitales`;
    return this.http.post( url, { nombre }, this.headers );
  }
  
  actualizarCategoria( _id: string, nombre: string  ) {

    const url = `${ base_url }/hospitales/${ _id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  borrarHospital( _id: string ) {

    const url = `${ base_url }/hospitales/${ _id }`;
    return this.http.delete( url, this.headers );
  }


}
