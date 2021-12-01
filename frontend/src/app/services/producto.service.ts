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
  obtenerProductoPorId( id: string ) {

    const url = `${ base_url }/productos/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, producto: Producto }) => resp.producto )
              );
  }

  crearProducto( producto: { nombre: string, categoria: string } ) {
    console.log(producto);
    console.log(this.headers);


    const url = `${ base_url }/productos`;
    return this.http.post( url, producto, this.headers );
  }

  actualizarProducto( producto: Producto  ) {

    const url = `${ base_url }/productos/${ producto._id }`;
    return this.http.put( url, producto, this.headers );
  }

  borrarProducto( _id: string ) {

    const url = `${ base_url }/productos/${ _id }`;
    return this.http.delete( url, this.headers );
  }
}


