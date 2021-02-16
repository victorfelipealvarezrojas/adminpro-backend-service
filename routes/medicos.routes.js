const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getMedicos,
    postCrearMedico,
    putActualizaMedico,
    deleteMedico,
    getMedicoId
} = require('../controllers/medicos.controller');


const router = Router();

router.get('/', validarJWT, getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre', "El nombre es obligarorio").not().isEmpty(),
        check('hospital', "El Id del Hospital debe ser valido").isMongoId(),
        validarCampos
    ],
    postCrearMedico);

router.put('/:id',
    [
        validarJWT,
        check('nombre', "El nombre es obligarorio").not().isEmpty(),
        check('hospital', "El Id del Hospital debe ser valido").isMongoId(),
        validarCampos
    ],
    putActualizaMedico);

router.delete('/:id', validarJWT, deleteMedico);

router.get('/:id', validarJWT, getMedicoId);

module.exports = router
