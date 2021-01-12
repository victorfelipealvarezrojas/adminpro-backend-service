const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    imagen: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
});

//configuracion global de esquema 
UsuarioSchema.method('toJSON', function () {
    //quito elementos para no retornarlos desde el modelo en la respuesta del controlador
    const { __v, _id,password, ...objeto } = this.toObject();
    objeto.uid=_id;
    return objeto;
});

module.exports = model('usuario', UsuarioSchema);