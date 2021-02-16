const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario.models');


/***********************************************************************************************************
# getUsuarios => Metodo que permite liostar todos los usuario
# Fecha de creacion: 11 de enero del 2021
************************************************************************************************************/
const getUsuarios = async (_request, _response) => {

    const desde = Number(_request.query.desde) || 0;

    /*const _usuario = await Usuario
                                .find({}, 'nombre role email google')
                                .skip(desde)
                                .limit(5);

    const total = await Usuario.count();*/

    const [_usuario, total] = await Promise.all([

        Usuario
            .find({}, 'nombre rol email google imagen')
            .skip(desde)
            .limit(5),

        Usuario.countDocuments()
    ])

    _response.json({
        ok: true,
        usuario: _usuario,
        tolal_registros: total
    });
}

/***********************************************************************************************************
# postCrearUsuario => Metodo que permite crear usuarios
# Fecha de creacion: 11 de enero del 2021
  ***Instancio response (response = response)/ const { response } = require('express') para tener 
     aceso a las propiedades en memoria***
************************************************************************************************************/
const postCrearUsuario = async (_request, _response) => {
    const { email, password } = _request.body

    try {

        const validaEmail = await Usuario.findOne({ email });

        if (validaEmail) {
            return _response.status(400).json({
                ok: false,
                mensaje: "Error: El correo ya se encuentra registrado con otro usuario"
            });
        }

        //instanca de la entidad usuario
        const _usuario = new Usuario(_request.body);
        //encriptar contraeña
        const salt = bcrypt.genSaltSync();
        _usuario.password = bcrypt.hashSync(password, salt)
        //guardar usuario
        await _usuario.save();


        //generar un token
        // Generar el TOKEN - JWT
        const token = await generarJWT(_usuario.id);

        _response.json({
            ok: true,
            usuario: _usuario,
            token
        });

    } catch (err) {

        _response.status(500).json({
            ok: false,
            mensaje: `Error Inesperado: ${err}`
        });

    }
}

/***********************************************************************************************************
# putActualizaUsuario => Metodo que permite actualizar un usuarios
# Fecha de creacion: 11 de enero del 2021
************************************************************************************************************/
const putActualizaUsuario = async (_request, _response = response) => {
    //obtengo id que llega como parte del segmento d ela URL
    const uid = _request.params.id;
    try {


        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return _response.status(404).json({
                ok: false,
                mensaje: "No existe un usuario para ese Id"
            });
        }

        //actualizacio
        const { password, google, email, ...campos } = _request.body;//elimino password, google,
        if (usuarioDB.email !== email) {
            const validaEmail = await Usuario.findOne({ email });
            if (validaEmail) {
                return _response.status(400).json({
                    ok: false,
                    mensaje: "Error: El correo ya se encuentra registrado con otro usuario"
                });
            }
        }

        if(!usuarioDB.google){
            campos.email = email;
        }
        const actualizaUsuario = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        _response.status(200).json({
            ok: true,
            mensaje: actualizaUsuario
        });


    } catch (err) {

        _response.status(500).json({
            ok: false,
            mensaje: `Error Inesperado: ${err}`
        });

    }
}


/***********************************************************************************************************
# deleteUsuario => Metodo que permite eliminar un usuarios
# Fecha de creacion: 11 de enero del 2021
************************************************************************************************************/
const deleteUsuario = async (_request, _response = response) => {
    //obtengo id que llega como parte del segmento d ela URL
    const uid = _request.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return _response.status(404).json({
                ok: false,
                mensaje: "No existe un usuario para ese Id"
            });
        }
        const resultado = await  Usuario.findByIdAndDelete(uid);
        _response.status(200).json({
            ok: true,
            mensaje: 'Usuario Eliminado'
        });

    } catch (err) {
        _response.status(500).json({
            ok: false,
            mensaje: `Error Inesperado: ${err}`
        });
    }
}

module.exports = {
    getUsuarios,
    postCrearUsuario,
    putActualizaUsuario,
    deleteUsuario
}