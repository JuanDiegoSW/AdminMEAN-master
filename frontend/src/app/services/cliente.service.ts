import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Cliente } from '../models/cliente.model'

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }
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
  cargarClientes() {

    const url = `${ base_url }/clientes`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean,clientes: Cliente[] }) => resp.clientes )
              );
  }

  crearCliente( nombre: string ) {

    const url = `${ base_url }/clientes`;
    return this.http.post( url, { nombre }, this.headers );
  }

  actualizarCliente( cliente: Cliente  ) {

    //console.log(cliente)
    const url = `${ base_url }/clientes/${ cliente._id }`;
    return this.http.put( url,  cliente , this.headers );
  }

  /*actualizarProducto( producto: Producto  ) {

    const url = `${ base_url }/productos/${ producto._id }`;
    return this.http.put( url, producto, this.headers );
  }*/

  obtenerClientePorId( _id: string ) {

    const url = `${ base_url }/clientes/${ _id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, cliente: Cliente }) => resp.cliente )
              );
  }

  borrarCliente( _id: string ) {

    const url = `${ base_url }/clientes/${ _id }`;
    return this.http.delete( url, this.headers );
  }
}
