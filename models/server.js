
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
require ('dotenv').config();

class server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api';
        this.authPath = '/api/auth';
        
        //conectar a la base de datos
        this.conectarDB();

        //middleware
        this.middleware();
        
        //rutas de la aplicacion
        this.routes();
    }

    async conectarDB(){
        
        dbConnection();
    }

    middleware(){

        //uso de cors
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use( express.json());

        //directorio publico
        this.app.use(express.static ('public'));
    }

    routes(){
        
        this.app.use(this.authPath, require('../routes/auth')),
            
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen(){
            this.app.listen(this.port, () =>{
            console.log('Aplicación corriendo en el puerto:', this.port);
        });

    }
}

module.exports  = server;