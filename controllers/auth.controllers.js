const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { getMenu } = require('../helpers/menu-fron');
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
            token,
            menu: getMenu(usuarioDB.rol)
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
        //desde elm _request llega el token obtenido en el proceso dee autenticacion en ANGULAR(vista)
        //dentro de ese token por medio de googleverify obtengo los valores desestructurados name, email, picture
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

        _response.status(200).json({
            ok: true,
            tokenId,
            menu: getMenu(usuarioBD.rol)
        });

    } catch (err) {
        _response.status(401).json({
            ok: false,
            mensaje: 'Token no es correcto' + err.mensaje
        });
    }


}


const getRenewToken = async (_request, _response) => {

    const uid = _request.uid;

    //obtener Usuario por Id
    const usuarioBD = await Usuario.findById(uid);

    // Generar el TOKEN - JWT         
    const tokenId = await generarJWT(uid);

    _response.json({
        ok: true,
        token: tokenId,
        usuario: usuarioBD,
        menu: getMenu(usuarioBD.rol)
    });
}



module.exports = {
    postLogin,
    postGoogleSignIn,
    getRenewToken
}