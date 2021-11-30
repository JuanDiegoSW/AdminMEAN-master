import { Categoria } from './categoria.model';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;

interface _ProductoUser {
    _id: string;
    nombre: string;
    img: string;
    estado: boolean;
    precio: Number;
    stock: Number;
}


export class Producto {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public estado?: boolean,
        public stock?: Number,
        public usuario?: _ProductoUser,
        public categoria?: Categoria,
    ) {}
    get imagenUrl() {

      if ( !this.img ) {
        console.log(this.img);

          return `${ base_url }/upload/productos/no-image`;
      } else if ( this.img.includes('https') ) {
        console.log(this.img);
        return this.img;
      } else if ( this.img ) {
        console.log(this.img);
          return `${ base_url }/upload/productos/${ this.img }`;
      } else {
          return `${ base_url }/upload/productos/no-image`;
      }
  }

}

