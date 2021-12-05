import { Cliente } from './cliente.model'

interface _VentaUser {
    _id: string;
    nombre: string;
    img: string;
    estado: boolean;
}


export class Venta {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?:_VentaUser,
        public cliente?: Cliente,
    ) {}

}

