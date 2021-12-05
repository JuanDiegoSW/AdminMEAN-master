
const { Schema, model } = require('mongoose');

const ventaSchema = Schema({
    fecha : {
        type:Date,
        default :  Date.now
    },
    venta_total: Number,
    cliente : {
        type: Schema.Types.ObjectId,
        ref:'Cliente',
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    productos: [{
        producto :{
            type: Schema.Types.ObjectId, ref: "Producto"
        },
        cantidad : Number
    }]
});


/*
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario  } = this.toObject();
    return usuario;
}*/

//exporta el modelo y crea la coleccion dentro de nuestra bd
module.exports = model( 'Ventas', ventaSchema );
