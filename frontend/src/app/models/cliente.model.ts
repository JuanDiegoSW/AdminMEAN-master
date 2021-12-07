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

}

