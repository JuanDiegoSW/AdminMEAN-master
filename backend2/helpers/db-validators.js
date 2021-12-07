const Role = require('../models/role');
const { Usuario, Categoria, Producto, Cliente, Proveedor } = require('../models');


const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( email = '' ) => {

    // Verificar si el email existe
    const existeEmail = await Usuario.findOne({ email });
    if ( existeEmail ) {
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
}

const emailExisteCliente = async( email = '' ) => {

    // Verificar si el email existe
    const existeEmail = await Cliente.findOne({ email });
    if ( existeEmail ) {
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el email existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}
/**
 * Categorias
 */
const existeCategoriaPorId = async( id ) => {

    // Verificar si el email existe
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`);
    }
}
const existeNombre = async( id ) => {

    // Verificar si el email existe
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`);
    }
}
/**
 * Productos
 */
const existeProductoPorId = async( id ) => {

    // Verificar si el email existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeProveedorPorId = async( id ) => {

    // Verificar si el id existe
    const existeProveedor = await Proveedor.findById(id);
    if ( !existeProveedor ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true;
}

/**
 * Verificar todo relacionado con el cliente
 */

const existeClientePorId = async (id) =>{
     // Verificar si el id existe
     const existeCliente = await Cliente.findById(id);
     if ( !existeCliente ) {
         throw new Error(`El id no existe ${ id }`);
     }
}
const DNIExiste = async( dni = '' ) => {

    // Verificar si el DNI existe
    const existeDNI = await Cliente.findOne({ dni });
    if ( existeDNI ) {
        throw new Error(`El DNI: ${ dni }, ya está registrado`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    existeProveedorPorId,
    coleccionesPermitidas,
    existeClientePorId,
    DNIExiste,
    emailExisteCliente
}

