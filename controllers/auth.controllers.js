const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario.models');
const { googleverify } = require('./../helpers/google_verify');




/***********************************************************************************************************
# postLogin => Metodo que permite realizar autenticacion
# Fecha de creacion: 15 de enero del 2021
************************************************************************************************************/
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

/***********************************************************************************************************
# postGoogleSignIn => Metodo que permite realizar autenticacion
# Fecha de creacion: 15 de enero del 2021
************************************************************************************************************/
const postGoogleSignIn = async (_request, _response) => {

    const googleToken = _request.body.token;

    try {

        const { name, email, picture } = await googleverify(googleToken);
        //verifico email 
        const usuarioBD = await Usuario.findOne({ email });
        let _usuario;

        if (!usuarioBD) {
            //si no existe usuario
            _usuario = new Usuario({
                nombre: name,
                email,
                imagen: picture,
                password: '@@@@',
                google: true
            });

        } else {
            //existe usuario
            _usuario = usuarioBD;
            _usuario.google = true;
            //_usuario.password = '@@@@';
        }

        await _usuario.save();
        //si todo es correcto genero el token
        // Generar el TOKEN - JWT         
        const tokenId = await generarJWT(_usuario._id);

        _response.status(500).json({
            ok: true,
            tokenId
        });

    } catch (err) {
        _response.status(401).json({
            ok: false,
            mensaje: 'Token no es correcto' + err.mensaje
        });
    }


}


module.exports = {
    postLogin,
    postGoogleSignIn
}