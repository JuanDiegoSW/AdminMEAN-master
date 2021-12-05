import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Venta } from '../models/venta.model'

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VentaService {
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

  cargarVentas(){
    const url = `${ base_url }/ventas`;
      return this.http.get( url, this.headers )
                .pipe(
                  map( (resp: {ventas: Venta[] }) => resp.ventas )
                );
  }
  obtenerVentaPorId( id: string ) {

    const url = `${ base_url }/ventas/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, ventas: Venta }) => resp.ventas )
              );
  }
  /*
  crearVenta( producto: { nombre: string, categoria: string } ) {
    console.log(producto);
    console.log(this.headers);


    const url = `${ base_url }/ventas`;
    return this.http.post( url, producto, this.headers );
  }

  actualizarProducto( producto: Producto  ) {

    const url = `${ base_url }/ventas/${ producto._id }`;
    return this.http.put( url, producto, this.headers );
  }

  borrarProducto( _id: string ) {

    const url = `${ base_url }/ventas/${ _id }`;
    return this.http.delete( url, this.headers );
  }*/

}
