const Medico = require('../models/medico.models');

/***********************************************************************************************************
# getMedicos => Metodo que permite liostar todos los medicos
# Fecha de creacion: 12 de enero del 2021
************************************************************************************************************/
const getMedicos = async (_request, _response) => {
    const _medico = await Medico.find({}).populate('usuario', 'nombre imagen').populate('hospital', 'nombre imagen');
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
    //id que viaja por la URL
    const MedicosId = _request.params.id;
    const uid = _request.uid;//jwtojen usuario
    const _medicos = await Medico.findById({ MedicosId });

    if (!_medicos)
        return _response.status(404).json({
            ok: false,
            mensaje: 'No se econtro nigun Medico con el Id seleccionado'
        });

    const nuevoMedico = {
        ..._request.body,
        usuario: uid
    }
    //actualizo registro
    const resultado = await Medico.findByIdAndUpdate(MedicosId, nuevoMedico, { new: true });

    try {
        _response.json({
            ok: true,
            medico: resultado
        });
    }
    catch (err) {
        _response.status(500).json({
            ok: false,
            mensaje: `Error Inesperado: ${err}`
        });
    }
}

/***********************************************************************************************************
# deleteMedico => Metodo que permite eliminar un medico
# Fecha de creacion: 12 de enero del 2021
************************************************************************************************************/
const deleteMedico = async (_request, _response) => {
    //id que viaja por la URL
    const medicoId = _request.params.id;
    const _medico = await Medico.findById({ medicoId });

    if (!_medico)
        return _response.status(404).json({
            ok: false,
            mensaje: 'No se econtro nigun medico con el Id seleccionado'
        });

    //actualizo registro
    await Medico.findByIdAndDelete(medicoId);

    try {
        _response.json({
            ok: true,
            mensaje: "El Medico fue eliminado"
        });
    }
    catch (err) {
        _response.status(500).json({
            ok: false,
            mensaje: `Error Inesperado: ${err}`
        });
    }
}

module.exports = {
    getMedicos,
    postCrearMedico,
    putActualizaMedico,
    deleteMedico
}