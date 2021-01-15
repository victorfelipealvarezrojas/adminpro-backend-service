const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    deleteHospital,
    putActualizaHospital,
    postCrearHospital,
    getHospitales
} = require('../controllers/hospitales.controller');


const router = Router();

router.get('/', validarJWT, getHospitales);

router.post('/',
    [
        validarJWT,
        check('nombre', "El nombre es obligarorio").not().isEmpty(),
        validarCampos
    ],
    postCrearHospital);

router.put('/:id',
    [

    ],
    putActualizaHospital);

router.delete('/:id', deleteHospital);

module.exports = router
