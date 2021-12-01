
const { Router } = require('express');
const { check } = require('express-validator');


//const { validarCampos } = require('../middlewares/validar-campos');
const { existeProductoPorId,existeCategoriaPorId,existeUsuarioPorId} = require('../helpers/db-validators');

const { productosGet,
        productoGet,
        productoPost,
        productoPut,
        productosPatch,
        productoDelete, } = require('../controllers/productos');

const { 
        validarJWT, 
        validarCampos,
        varlidarADMIN_ROLE,
        varlidarADMIN_ROLE_o_MismoUsuario
        } = require('../middlewares');
const router = Router();


router.get('/',validarJWT,productosGet );
router.get('/:id',validarJWT,productoGet );

router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],productoPut );

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('stock', 'El Stock es obligatoria').not().isEmpty(),
    //check('categoria').custom(existeCategoriaPorId),
    //check('usuario').custom(existeUsuarioPorId),
    validarCampos
], productoPost );

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],productoDelete );

router.patch('/', productosPatch );


module.exports = router;