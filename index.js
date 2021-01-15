const express = require('express');
require('dotenv').config();//busca archivo env y lo establece n variables de entorno
const { DbConnection } = require('./database/config');

const cors = require('cors')

//1._ crear el servidor express
const app = express();//inicializo la app de express
//4._ CORS
app.use(cors());
//Lectura y parseo del body
app.use(express.json());//me permite obtener los valores desde el body en el request

//3._BD
DbConnection();

//directorio publico
app.use(express.static('public'));

//2._ Rutas que tendra mi App
app.use('/api/usuario', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/hospital', require('./routes/hospital.routes'));
app.use('/api/medico', require('./routes/medicos.routes'));
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/upload', require('./routes/uploads.routes'));


app.listen(process.env.PORT, () => {

});