'use strict'
import { set, Promise as Promise, connect } from 'mongoose';
import { listen } from './app';
const port = 3900;
    set('useFindAndModify',false);
    Promise = global.Promise;
    connect('mongodb://localhost:27017/api_rest_blog',{ useNewUrlParser: true})
        .then(() =>{
         console.log('La conexion a la base de datos se realizado correctamente');

         // Crear servidor y ponerme a escuchar peticiones http
         listen(port,()=>{
             console.log(`Servidor corriendo en http://localhost:${port}`)
         });
         
        });

 