const { validationResult } = require('express-validator');

const validarCampos = (_request, _response, _next) => {
    const errores = validationResult(_request);
    if (!errores.isEmpty()) {
        return _response.status(400).json({
            ok: false,
            mensaje: errores.mapped()
        });
    }
    _next();
}

module.exports = {
    validarCampos
}