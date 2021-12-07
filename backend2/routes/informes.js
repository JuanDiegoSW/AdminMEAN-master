const { Router } = require('express');
const { validarJWT } = require('../middlewares')

const router = Router();

router.get('/',validarJWT,ventasporfechas );
router.get('/:id',validarJWT,cantidadVenidas );


module.exports = router;