const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Cliente = require('../models/cliente');



const clientesGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, clientes ] = await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        clientes
    });
}
const clienteGet = async (req =  request, res = response) => {
    const {id} = req.params

    const cliente =   await Cliente.findById(id)

    res.json({
        ok:true,
        cliente
    })
}

const clientesPost = async(req, res = response) => {
    
       
        const { nombre,email, dni, telefono, direccion } = req.body;
        const cliente = new Cliente( nombre,email, dni, telefono, direccion);
        try {
          const clienteDB = await cliente.save();
          res.json({
            cliente:clienteDB
        });
        } catch (error) {
          //console.log(error);
          res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

        }
}

const clientesPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, correo, ...resto } = req.body;


    const clienteactualizado = await Cliente.findByIdAndUpdate( id, resto );

    res.json({
        ok: true,
        cliente: clienteactualizado
    });
}

const clientesPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - ClientesPatch'
    });
}

const clientesDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const Cliente = await Cliente.findByIdAndDelete( id );

    const cliente = await Cliente.findByIdAndUpdate( id, { estado: false } );


    res.json(cliente);
}




module.exports = {
    clientesGet,
    clienteGet,
    clientesPost,
    clientesPut,
    clientesPatch,
    clientesDelete,
}