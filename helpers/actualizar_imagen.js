const fs = require('fs');
const Hospital = require('../models/hospital.models');
const Usuario = require('../models/usuario.models');
const Medico = require('../models/medico.models');

const borrarImagen = (path) => {
    if (fs.existsSync(path))//valido existencia del archivo
        fs.unlinkSync(path);//elimino archivo antiguo
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let  pathViejo = '';
    switch (tipo) {
        case 'medicos':

            const medico = await Medico.findById(id);
            if (!medico)
                return false;

            pathViejo = `./uploads/medicos/${medico.imagen}`;
            borrarImagen(pathViejo);

            medico.imagen = nombreArchivo;
            await medico.save();
            return true;

            break;

        case 'hospitales':

            const hospital = await Hospital.findById(id);
            if (!hospital)
                return false;

            pathViejo = `./uploads/hospital/${hospital.imagen}`;
            borrarImagen(pathViejo);

            hospital.imagen = nombreArchivo;
            await hospital.save();
            return true;

            break;
        case 'usuarios':

            const usuarios = await Usuario.findById(id);
            console.log("usuarios",usuarios)
            if (!usuarios)
                return false;

            pathViejo = `./uploads/usuario/${usuarios.imagen}`;
            borrarImagen(pathViejo);

            usuarios.imagen = nombreArchivo;
            await usuarios.save();
            return true;

            break;
    }
}

module.exports = {
    actualizarImagen
}