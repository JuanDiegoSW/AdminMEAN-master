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
        public precio?: Number,
        public stock?: Number,
        public usuario?: _ProductoUser,
        public categoria?: Categoria,
    ) {}


}

