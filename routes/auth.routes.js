const { Router } = require('express');
const { check } = require('express-validator');
const { postLogin } = require('../controllers/auth.controllers');


const router = Router();

router.post('/',
    [
        check('email', 'El Correo es obligatorio').isEmail(),
        check('password', 'El Password es obligatorio').not().isEmpty()
        
    ],
    postLogin
)

module.exports = router;