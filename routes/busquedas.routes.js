const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getBusquedaTexto, getDocumentosColeccion } = require('../controllers/busaquedas.controller');


const router = Router();

router.get('/:texto', validarJWT, getBusquedaTexto);
router.get('/coleccion/:tabla/:texto', validarJWT, getDocumentosColeccion);

module.exports = router;