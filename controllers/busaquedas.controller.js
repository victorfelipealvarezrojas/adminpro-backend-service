const Hospital = require('../models/hospital.models');
const Usuario = require('../models/usuario.models');
const Medico = require('../models/medico.models');

const getBusquedaTexto = async (_request, _response) => {

    const texto = _request.params.texto;
    const regularExp = new RegExp(texto, 'i');

    const [_usuarios, _medicos, _hospitales] = await Promise.all([
        Usuario.find({ nombre: regularExp }),
        Medico.find({ nombre: regularExp }),
        Hospital.find({ nombre: regularExp })
    ]);

    _response.json({
        ok: true,
        usuarios: _usuarios,
        medicos: _medicos,
        hospitales: _hospitales
    });
}

const getDocumentosColeccion = async (_request, _response) => {
    const tabla = _request.params.tabla;
    const texto = _request.params.texto;
    const regularExp = new RegExp(texto, 'i');
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regularExp }).populate('usuario', 'nombre imagen').populate('hospital', 'nombre imagen');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regularExp }).populate('usuario', 'nombre imagen');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regularExp });
            break;
        default:

            return _response.status(400).json({
                ok: false,
                mensaje: `La tabla no esta definidas`
            });
    }
}

module.exports = {
    getBusquedaTexto,
    getDocumentosColeccion
}