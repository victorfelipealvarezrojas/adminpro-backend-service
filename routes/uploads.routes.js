const { Router } = require('express');
const expressFileupload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { putFileUpload, getRetornaImagen } = require('../controllers/uploads.controller');


const router = Router();

//me permite tener acceso a los archivos que cargo, accedere a ellos desde la vistav por la url de la api + sub carpetas ademas de almacenarlos
router.use(expressFileupload());

router.put('/:tipo/:id', validarJWT, putFileUpload);
router.get('/:tipo/:foto', getRetornaImagen);


module.exports = router;