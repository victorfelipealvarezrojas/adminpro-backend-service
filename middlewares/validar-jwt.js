const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.models');

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

/**************************************************************************************************************************
# validarAdmin_Role => Metodo que permite validar el rol del usuarioy asi pobrer bloquear una transaccion desde el routing
# Fecha de creacion: 12 de febrero del 2021
***************************************************************************************************************************/
const validarAdmin_Role = async (_request, _response, _next) => {
    const uid = _request.uid;//fue establecida en validarJWT
    try {
        const _usuario = await Usuario.findById(uid);
        if (!_usuario) {
            return _response.status(404).json({
                ok: false,
                msg: 'Usuario no existe en base de datos'
            });
        };
        if (_usuario.rol !== 'ADMIN_ROLE') {
            return _response.status(403).json({
                ok: false,
                msg: 'El usuario no tiene los permisos para realizar esta operacion'
            });
        } else {
            _next();
        }

    } catch (error) {
        return _response.status(401).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }
}

/**************************************************************************************************************************
# validarAdmin_Role_MismoUsuario => Metodo que permite validar el rol del usuarioy asi pobrer bloquear una transaccion desde el routing
# pero eprmite que el mismo usuario actualice(imagen nombre ,email) su perfil independiente del rol
# Fecha de creacion: 12 de febrero del 2021
***************************************************************************************************************************/
const validarAdmin_Role_MismoUsuario = async (_request, _response, _next) => {
    const id = _request.params.id;//id que llega por la url en el routing, el id que quiero actualizar 
    const uid = _request.uid;//fue establecida en validarJWT
    try {
        const _usuario = await Usuario.findById(uid);
        if (!_usuario) {
            return _response.status(404).json({
                ok: false,
                msg: 'Usuario no existe en base de datos'
            });
        };

        if (_usuario.rol === 'ADMIN_ROLE' || uid === id) {
            _next();
        } else {
            return _response.status(403).json({
                ok: false,
                msg: 'El usuario no tiene los permisos para realizar esta operacion'
            });
        }

    } catch (error) {
        return _response.status(401).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }
}

module.exports = {
    validarJWT,
    validarAdmin_Role,
    validarAdmin_Role_MismoUsuario
}