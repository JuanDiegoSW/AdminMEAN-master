//import { Categoria } from './categoria.model';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;
/*
interface _ClienteUser {
    _id: string;
    nombre: string;
    email: string;
    dni: Number;
    estado: Boolean;
    telefono: Number;
    direccion: String;
}*/


export class Cliente {

    constructor(
        public nombre: string,
        public _id?: string,
        public email?: string,
        public img?: string,
        public dni?: Number,
        public estado?: boolean,
        public telefono?: String,
        public direccion?: String
    ) {}
    get imagenUrl() {

      if ( !this.img ) {
        return `${ base_url }/upload/usuarios/no-image`;
      } else if ( this.img.includes('https') ) {
        //console.log(this.img);
        return this.img;

      } else if ( this.img ) {
        console.log(this.img);
        //return `${ base_url }/upload/clientes/${ this.img }`;

      } else {
          return `${ base_url }/upload/usuarios/no-image`;
      }
  }

}

