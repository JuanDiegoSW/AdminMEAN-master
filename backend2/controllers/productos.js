const { response, request } = require('express');
//const bcryptjs = require('bcryptjs');


const Producto = require('../models/producto');



const productosGet = async(req = request, res = response) => {

    const productos = await Producto.find()
                                .populate('usuario','nombre')
                                .populate('categoria','nombre')


    res.json({
        ok: true,
        productos
    })
}

const articulosPost = async(req, res = response) => {
    //console.log (req.body)
    const { nombre, cantidad, precio_venta, precio_compra,img,categoria,estado} = req.body;
    const articulos = new Articulo({ nombre, cantidad, precio_venta, precio_compra,img,categoria,estado });

    // Guardar en BD
    await articulos.save();

    res.json({
        articulos
    });
}

const articulosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, nombre, ...resto } = req.body;

    

    const articulo = await Articulo.findByIdAndUpdate( id, resto );

    res.json(articulo);
}

const articulosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - articulosPatch'
    });
}

const articulosDelete = async(req, res = response) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    const articulo = await Articulo.findByIdAndDelete( id );

    //const Articulo = await Articulo.findByIdAndUpdate( id, { estado: false } );


    res.json(articulo);
}




module.exports = {
    productosGet,
    articulosPost,
    articulosPut,
    articulosPatch,
    articulosDelete,
}
