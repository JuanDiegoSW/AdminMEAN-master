const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/v1/usuarios';
        this.categoriaPath = '/api/v1/categorias';
        this.clientePath = '/api/v1/clientes';
        this.productosPath = '/api/v1/productos';
        this.proveedorPath = '/api/v1/proveedores';
        this.ventasPath = '/api/v1/ventas';
        this.detalleVentaPath = '/api/v1/detalleventas';
        this.authPath = '/api/v1/login';
        this.uploadPath = '/api/v1/upload';
        this.busquedaPath = '/api/v1/todo';
        this.informesPath = '/api/v1/informes';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
        this.app.use( this.productosPath, require('../routes/productos'));
        this.app.use( this.categoriaPath, require('../routes/categorias'));
        this.app.use( this.clientePath, require('../routes/clientes'));
        this.app.use( this.proveedorPath, require('../routes/proveedores'));
        this.app.use( this.ventasPath, require('../routes/ventas'));
        this.app.use( this.detalleVentaPath, require('../routes/detalle_ventas'));
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.uploadPath, require('../routes/uploads'));
        this.app.use( this.busquedaPath,require('../routes/busquedas') );
        this.app.use( this.informesPath,require('../routes/informes') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
