const jwt = require('jsonwebtoken');

const validarJWT = (_request, _response, _next) => {
    // Leer el Token
    const token = _request.header('x-token');

    if (!token) {
        return _response.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        //establezco infromacion en la request del controlador al que redireccione el _next
        _request.uid = uid;
        _next();

    } catch (error) {
        return _response.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validarJWT
}