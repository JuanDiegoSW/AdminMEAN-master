import { Categoria } from './categoria.model';
interface _ProductoUser {
    _id: string;
    nombre: string;
    img: string;
    estado: boolean;
    precio: Number;
}


export class Producto {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public estado?: boolean,
        public usuario?: _ProductoUser,
        public categoria?: Categoria,
    ) {}

}

