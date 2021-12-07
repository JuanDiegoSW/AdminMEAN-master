const { response, request } = require('express');
const Venta = require('../models/venta');

let guardar = (req,res) =>{

    let body = req.body;

    let venta = Venta({
        valor_total : body.total,
        cliente : body.cliente,
        
    });

}

const ventasGet = async(req = request, res = response) => {

    /*const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, ventas ] = await Promise.all([
        Venta.countDocuments(query),
        Venta.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);*/

    const ventas = await Venta.find()
                            .populate('usuario')
                            .populate('cliente','nombre')
                            .populate('productos.producto','nombre')
                            

    res.json({
        //total,
        ventas
    });
}

const ventasPost = async(req, res = response) => {

    const uid = req.uid
    const venta = new Venta({
      usuario:uid,
      ... req.body
    });
    try {
      const ventaDB = await venta.save();
      res.json({
        producto:ventaDB
    });
    } catch (error) {
      console.log(error);
      res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const ventasPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, usuario, ...resto } = req.body;

    

    const venta = await Venta.findByIdAndUpdate( id, resto );

    res.json(venta);
}

const ventasPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - ventasPatch'
    });
}

const ventasDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const Venta = await Venta.findByIdAndDelete( id );

    const Venta = await Venta.findByIdAndUpdate( id, { estado: false } );


    res.json(Venta);
}




module.exports = {
    ventasGet,
    ventasPost,
    ventasPut,
    ventasPatch,
    ventasDelete,
    guardar
}
