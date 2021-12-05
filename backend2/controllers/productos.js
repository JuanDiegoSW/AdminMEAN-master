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

const productoGet = async(req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
                                .populate('usuario','nombre')
                                .populate('categoria','nombre')


    res.json({
        ok: true,
        producto
    })
}

const productoPost = async(req, res = response) => {
    //console.log (req.body)
    //const { nombre,estado,usuario,precio, stock,categoria,img} = req.body;
    //const producto = new Producto({ nombre,estado,usuario,precio, stock,categoria,img });
    //console.log(req);

    const uid = req.uid
    const producto = new Producto({
      usuario:uid,
      ... req.body
    });
    try {
      const productoDB = await producto.save();
      res.json({
        producto:productoDB
    });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    })

    }
    
}

const productoPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;

    

    const producto = await Producto.findByIdAndUpdate( id, resto );

    res.json(producto);
}

const productosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - articulosPatch'
    });
}

const productoDelete = async(req, res = response) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    const producto = await Producto.findByIdAndDelete( id );

    //const Articulo = await Articulo.findByIdAndUpdate( id, { estado: false } );


    res.json(producto);
}




module.exports = {
    productosGet,
    productoGet,
    productoPost,
    productoPut,
    productosPatch,
    productoDelete,
}
