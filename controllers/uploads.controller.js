const { v4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const Hospital = require('../models/hospital.models');
const Usuario = require('../models/usuario.models');
const Medico = require('../models/medico.models');
const { actualizarImagen } = require('../helpers/actualizar_imagen');


/***********************************************************************************************************
# putFileUpload => Metodo que permite guardar una imagen
# Fecha de creacion: 15 de enero del 2021
************************************************************************************************************/
const putFileUpload = async (_request, _response) => {

    const tipo = _request.params.tipo;//tipo que llega por la url
    const id = _request.params.id;//id de medico que llega desde la url
    const tiposValidos = ['medicos', 'hospitales', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        _response.status(400).json({
            ok: true,
            mensaje: "No es un medicos, hospitales o usuarios."
        });
    }

    if (!_request.files || Object.keys(_request.files).length === 0) {
        return _response.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo.'
        });
    }

    //proceso la image 
    const file = _request.files.imagen;
    const nombreCortado = file.name.split('.');
    const exstencion = nombreCortado[nombreCortado.length - 1];

    //valiodar extencion
    const permitidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!permitidas.includes(exstencion)) {
        _response.status(400).json({
            ok: false,
            mensaje: "No es una exstencion permitida."
        });
    }

    //generar el nombre del archivo.
    const nombreArchivo = `${v4()}.${exstencion}`;

    //ruta para guardar la imagen.
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    //moder imagen
    file.mv(path, (err) => {
        if (err) {
            return _response.status(500).json({
                ok: false,
                mensaje: "Error al mover la imagen."
            });
        }
    });

    //actualizar registro 
    actualizarImagen(tipo, id,  nombreArchivo);

    _response.json({
        ok: true,
        usuarios: 'Archivo subido',
        archivo: nombreArchivo
    });
}

/***********************************************************************************************************
# getRetornaImagen => Metodo que permite desplegar una imagen
# Fecha de creacion: 15 de enero del 2021
************************************************************************************************************/
const getRetornaImagen = (_request, _response) =>{

    const tipo = _request.params.tipo;//tipo que llega por la url(usuarios/medicos/hospitales)
    const foto = _request.params.foto;//foto que llega por la url
    
    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);
   

    //si la ruta ded la imagen existe
    if(fs.existsSync(pathImg))
        return  _response.sendFile(pathImg);

    //si la ruta de la imagen no existe
    const pathImg2 = path.join(__dirname,`../uploads/defaultImg.jpg`);
    _response.sendFile(pathImg2);
}

module.exports = {
    putFileUpload,
    getRetornaImagen
}
