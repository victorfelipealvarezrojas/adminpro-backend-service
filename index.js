const express = require('express');
require('dotenv').config();//busca archivo env y lo establece n variables de entorno
const { DbConnection } = require('./database/config');

const cors = require('cors')

//1._ crear el servidor express
const app = express();//inicializo la app de express
//4._ CORS
app.use(cors());
//3._BD
DbConnection();

//2._ Rutas que tendra mi App
app.get('/', (req, res) => {
    response.json({
        ok:true,
        msg:'Hola mundo'
    });
});


app.listen(process.env.PORT, () => {
    
});