const Medico = require('../models/medico.models');

/***********************************************************************************************************
# getMedicos => Metodo que permite liostar todos los medicos
# Fecha de creacion: 12 de enero del 2021
************************************************************************************************************/
const getMedicos = async (_request, _response) => {
    const _medico = await Medico.find({}).populate('usuario','nombre imagen').populate('hospital','nombre imagen');
    _response.json({
        ok: true,
        usuario: _medico
    });
}

/***********************************************************************************************************
# postCrearMedico => Metodo que permite registrar un medico
# Fecha de creacion: 12 de enero del 2021
************************************************************************************************************/
const postCrearMedico = async (_request, _response) => {
    const uid = _request.uid;//valor llega desde el middleware que valida el token
    //instancio la entidad y le entrego los valores que llegan desde el request
    const _medico = new Medico({
        usuario: uid,
        ..._request.body
    });

    try {

        const resultado = await _medico.save();

        _response.json({
            ok: true,
            medico: resultado
        });

    } catch (err) {

        _response.status(500).json({
            ok: false,
            mensaje: `Error Inesperado: ${err}`
        });

    }
}

/***********************************************************************************************************
# putActualizaMedico => Metodo que permite actualizar un medico
# Fecha de creacion: 12 de enero del 2021
************************************************************************************************************/
const putActualizaMedico = async (_request, _response) => {
    //const _hospitales = await Hospitales.find({}, 'nombre role email google');
    _response.json({
        ok: true,
        usuario: "medico"
    });
}

/***********************************************************************************************************
# deleteMedico => Metodo que permite eliminar un medico
# Fecha de creacion: 12 de enero del 2021
************************************************************************************************************/
const deleteMedico = async (_request, _response) => {
    //const _hospitales = await Hospitales.find({}, 'nombre role email google');
    _response.json({
        ok: true,
        usuario: "medico"
    });
}

module.exports = {
    getMedicos,
    postCrearMedico,
    putActualizaMedico,
    deleteMedico
}