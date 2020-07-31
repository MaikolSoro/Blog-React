"use strict";

// cargar modulos de node para crear servidor

import express from "express";

import { urlencoded, json } from "body-parser";

//Ejecutar express (http)

const app = express();

//cargar ficheros rutas
import article_routes from "./routes/article";

//middlewares

app.use(urlencoded({ extend: false }));
app.use(json());

// CORS

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Añadir prefijos a rutas / Cargar rutas
app.use("/api", article_routes);

//Exportar modulo(fichero actual)

export default app;
