const Hospital = require('../models/hospital.models');

/***********************************************************************************************************
# getHospitales => Metodo que permite liostar todos los hospitales
# Fecha de creacion: 12 de enero del 2021
************************************************************************************************************/
const getHospitales = async (_request, _response) => {
    const _hospitales = await Hospital.find({}).populate('usuario', 'nombre imagen');
    _response.json({
        ok: true,
        hospital: _hospitales
    });
}

/***********************************************************************************************************
# postCrearHospital => Metodo que permite crear todos un hospitales
# Fecha de creacion: 12 de enero del 2021
************************************************************************************************************/
const postCrearHospital = async (_request, _response) => {

    const uid = _request.uid;//valor llega desde el middleware que valida el token
    //instancio la entidad y le entrego los valores que llegan desde el request
    const _hospital = new Hospital({
        usuario: uid,
        ..._request.body
    });

    try {

        const resultado = await _hospital.save();

        _response.json({
            ok: true,
            hospital: resultado
        });

    } catch (err) {

        _response.status(500).json({
            ok: false,
            mensaje: `Error Inesperado: ${err}`
        });

    }

}

/***********************************************************************************************************
# putActualizaHospital => Metodo que permite actualizar un hospitales
# Fecha de creacion: 12 de enero del 2021
************************************************************************************************************/
const putActualizaHospital = async (_request, _response) => {
    //id que viaja por la URL
    const hospitalId = _request.params.id;
    const uid = _request.uid;//jwtojen
    //{ _id:hospitalId } siempre tiene quie tener el nombre del campo del modelo
    const _hospital = await Hospital.findById({ _id: hospitalId });

    if (!_hospital)
        return _response.status(404).json({
            ok: false,
            mensaje: 'No se econtro nigun hoaspital con el Id seleccionado'
        });

    const nuevoHospital = {
        ..._request.body,
        usuario: uid
    }
    //actualizo registro
    const resultado = await Hospital.findByIdAndUpdate(hospitalId, nuevoHospital, { new: true });

    try {
        _response.json({
            ok: true,
            hospital: resultado
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
# deleteHospital => Metodo que permite eliminar un hospitales
# Fecha de creacion: 12 de enero del 2021
************************************************************************************************************/
const deleteHospital = async (_request, _response) => {
    //id que viaja por la URL
    const hospitalId = _request.params.id;
    const _hospital = await Hospital.findById({ _id: hospitalId });

    if (!_hospital)
        return _response.status(404).json({
            ok: false,
            mensaje: 'No se econtro nigun hoaspital con el Id seleccionado'
        });


    //actualizo registro
    await Hospital.findByIdAndDelete({ _id: hospitalId });

    try {
        _response.json({
            ok: true,
            mensaje: "El hospital fue eliminado"
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
    getHospitales,
    postCrearHospital,
    putActualizaHospital,
    deleteHospital
}