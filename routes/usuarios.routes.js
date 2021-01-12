const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getUsuarios,
    postCrearUsuario,
    putActualizaUsuario,
    deleteUsuario
} = require('../controllers/usuarios.controllers');


const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/',
    [
        check('nombre', "El nombre es obligarorio").not().isEmpty(),
        check('password', "El password es obligarorio").not().isEmpty(),
        check('email', "El email no tiene un formato valido").isEmail(),
        validarCampos
    ],
    postCrearUsuario);

router.put('/:id',
    [
        validarJWT,
        check('nombre', "El nombre es obligarorio").not().isEmpty(),
        check('email', "El email no tiene un formato valido").isEmail(),
        check('rol', "El rol es obligatorio").not().isEmpty(),
        validarCampos
    ],
    putActualizaUsuario);

router.delete('/:id', validarJWT, deleteUsuario);

module.exports = router
