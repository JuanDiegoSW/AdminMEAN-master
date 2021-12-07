
const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    img: {
        type: String,
    },
    dni: {
        type: Number,
        required: [true, 'El DNI es obligatorio'],
        unique:true
    },
    estado: {
        type: Boolean,
        default: true
    },
    telefono:{
        type:Number,
    },
    direccion:{
        type:String,
    }
});



/*UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario  } = this.toObject();
    return usuario;
}*/

//exporta el modelo y crea la coleccion dentro de nuestra bd
module.exports = model( 'Cliente', ClienteSchema );
