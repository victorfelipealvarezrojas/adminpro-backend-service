const { Schema, model } = require('mongoose');

const MedicoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    imagen: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,//indica una relacion o referencia a otra entidad por su objeto Id
        ref: 'usuario'//indica con cual entidad se relacionara 
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,//indica una relacion o referencia a otra entidad por su objeto Id
        ref: 'hospital',//indica con cual entidad se relacionara 
    }

}, { collection: 'medicos' });//cambio nombre con el cual se representara en la BD

//configuracion global de esquema 
MedicoSchema.method('toJSON', function () {
    //quito elementos para no retornarlos desde el modelo en la respuesta del controlador
    const { __v, _id, ...objeto } = this.toObject();
    objeto.id = _id;
    return objeto;
});

module.exports = model('medico', MedicoSchema);