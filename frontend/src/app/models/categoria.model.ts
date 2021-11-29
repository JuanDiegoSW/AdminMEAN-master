interface _CategoriaUser {
    _id: string;
    nombre: string;
    img: string;
    estado: boolean;
}


export class Categoria {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public estado?: boolean,
    ) {}

}

