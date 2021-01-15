const { Router } = require('express');
const expressFileupload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { putFileUpload, getRetornaImagen } = require('../controllers/uploads.controller');


const router = Router();

router.use(expressFileupload());//me permite tener acceso a los archivos que cargo

router.put('/:tipo/:id', validarJWT, putFileUpload);
router.get('/:tipo/:foto', getRetornaImagen);


module.exports = router;