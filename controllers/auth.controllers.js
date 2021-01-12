const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario.models');


const postLogin = async (_request, _response) => {
    const { email, password } = _request.body;

    try {
        //verifica correo
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return _response.status(404).json({
                ok: false,
                mensaje: "Datos no coinciden"
            });
        }

        //verifica contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return _response.status(400).json({
                ok: false,
                mensaje: 'Contraseña no corresponde.'
            });
        }

        //generar un token
        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);
        console.log("token", token);
        _response.json({
            ok: true,
            token
        });



    } catch (error) {

        _response.status(500).json({
            ok: false,
            mensaje: `Error Inesperado: ${err}`
        });

    }
}

module.exports = {
    postLogin
}