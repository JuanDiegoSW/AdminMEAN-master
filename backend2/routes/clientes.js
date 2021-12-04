
const { Router } = require('express');
const { check } = require('express-validator');

const { DNIExiste, emailExisteCliente, existeClientePorId } = require('../helpers/db-validators');
const { 
    validarJWT, 
    validarCampos,
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
    } = require('../middlewares');

const { clientesGet,
        clientesPut,
        clientesPost,
        clientesDelete,
        clientesPatch } = require('../controllers/clientes');

const router = Router();


router.get('/',validarJWT,clientesGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeClientePorId ),
    validarCampos,
    validarJWT
],clientesPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExisteCliente ),
    check('dni').custom( DNIExiste),
    check('dni','El DNI debe tner 8 digitos').isLength({max:8, min:8}),
    check('telefono','El telefono debe tener 9 digitos').isLength({max:9,min:9}),
    validarCampos
], clientesPost );

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeClientePorId ),
    validarCampos
],clientesDelete );

router.patch('/', clientesPatch );




module.exports = router;