export class Proveedor {

    constructor(
        public ruc: Number,
        public nombre: string,
        public _id?: string,
        public direccion?: string,     
        public telefono?: Number,
        public email?: string,
        public estado?: boolean
    ) {}

}