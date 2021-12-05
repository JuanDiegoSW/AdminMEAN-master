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

    const url = `${ base_url }/categorias`;
    return this.http.post( url, { nombre }, this.headers );
  }

  actualizarClienete( _id: string, nombre: string  ) {

    const url = `${ base_url }/categorias/${ _id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  borrarCliente( _id: string ) {

    const url = `${ base_url }/categorias/${ _id }`;
    return this.http.delete( url, this.headers );
  }
}
