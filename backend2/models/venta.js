
const { Schema, model } = require('mongoose');

const VentaSchema = Schema({
    cliente : {
        type: Schema.Types.ObjectId,
        ref:'Cliente'
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatorio']
    },
    productos:{

    },
    total:{
        type:Number,
    }
});


/*
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario  } = this.toObject();
    return usuario;
}*/

//exporta el modelo y crea la coleccion dentro de nuestra bd
module.exports = model( 'Ventas', VentaSchema );
