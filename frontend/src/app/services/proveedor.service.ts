import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Proveedor } from './../models/proveedor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

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

  cargarProveedores() {

    const url = `${ base_url }/proveedores`;
      return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, proveedores: Proveedor[] }) => resp.proveedores )
              );
  }

  obtenerProveedorPorId( id: string ) {

    const url = `${ base_url }/proveedores/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, proveedor: Proveedor }) => resp.proveedor )
              );
  }

  crearProveedor(proveedor : { ruc: Number, nombre: string } ) {
    const url = `${ base_url }/proveedores`;
    return this.http.post( url, proveedor, this.headers );
  }

  actualizarProveedor( proveedor: Proveedor  ) {

    const url = `${ base_url }/proveedores/${ proveedor._id }`;
    return this.http.put( url, proveedor, this.headers );
  }

  borrarProveedor( _id: string ) {

    const url = `${ base_url }/proveedores/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
