
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
        clienteGet,
        clientesPut,
        clientesPost,
        clientesDelete,
        clientesPatch } = require('../controllers/clientes');

const router = Router();


router.get('/',validarJWT,clientesGet );
router.get('/:id',validarJWT,clienteGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeClientePorId ),
    validarCampos,
    validarJWT
],clientesPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email').custom( emailExisteCliente ),
    check('dni').custom( DNIExiste),
    validarCampos
], clientesPost );

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeClientePorId ),
    validarCampos
],clientesDelete );

router.patch('/', clientesPatch );




module.exports = router;