const { Router } = require('express');
const { funciones } = require('../controllers/informes')

const router = Router();

router.get('/data1',funciones)


module.exports = router;