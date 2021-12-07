const { Router } = require('express');
const { check } = require('express-validator');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuarioGet,
        verifyToken,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPostLogin,
        usuariosPostRegister,
        usuariosPatch } = require('../controllers/usuarios');
const { 
    validarJWT, 
    validarCampos,
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
    } = require('../middlewares');

const router = Router();


router.get('/', validarJWT, usuariosGet );
router.get('/:id', validarJWT, usuarioGet );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    //check('role').custom( esRoleValido ), 
    validarCampos
], usuariosPost );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    //check('role').custom( esRoleValido ), 
    check('role', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
],usuariosPut );

router.post('/login', usuariosPostLogin );
router.post('/register', usuariosPostRegister );

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );

module.exports = router;