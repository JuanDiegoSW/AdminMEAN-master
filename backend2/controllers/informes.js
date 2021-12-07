const { response, request } = require('express');

const Producto = require('../models/producto');
const Venta = require('../models/venta');
const Cliente = require('../models/cliente');
const Prov = require('../models/proveedor');



const funciones = async(req = request, res = response) => {

    /*const productos = await Producto.find()
                                .populate('usuario','nombre')
                                .populate('categoria','nombre')
    */
    const nro_ventas = await Venta.countDocuments()
    const nro_productos = await Producto.countDocuments()
    const nro_clientes = await Cliente.countDocuments()
    const nro_prov = await Prov.countDocuments()
        
    res.json({
        ventas : nro_ventas,
        productos : nro_productos,
        clientes : nro_clientes,
        proveedores : nro_prov
    })
}






module.exports = {
    funciones
}
