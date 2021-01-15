const { Router } = require('express');
const { check } = require('express-validator');
const { postLogin, postGoogleSignIn,getRenewToken } = require('../controllers/auth.controllers');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/',
    [
        check('email', 'El Correo es obligatorio').isEmail(),
        check('password', 'El Password es obligatorio').not().isEmpty()

    ],
    postLogin
);

router.post('/google',
    [
        check('token', 'El Token de Google es obligatorio').not().isEmpty()
    ],
    postGoogleSignIn
);

router.get('/review',validarJWT, getRenewToken);


module.exports = router;