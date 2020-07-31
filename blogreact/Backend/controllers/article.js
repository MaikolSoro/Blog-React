"use strict";

import { isEmpty } from "validator";
import { unlink, exists as _exists } from "fs";
import { resolve } from "path";

import Article, {
  find,
  findById,
  findByIdAndUpdate,
  findOneAndDelete,
  findOneAndUpdate,
} from "../models/article";

const controller = {
  datosBlog: (req, res) => {
    const hola = req.body.hola;

    return res.status(200).send({
      blog: "React and angular",
      autor: "Maikol Soro",
      url: "maikolsoroweb.es",
      hola,
    });
  },
  test: (req, res) => {
    return res.status(200).send({
      message: "Soy la acción test de mi controlador de articulos",
    });
  },

  save: (req, res) => {
    // Recoger parametros por post

    let params = req.body;

    // validar los datos ( validator)
    try {
      var validate_title = !isEmpty(params.title);
      var validate_content = !isEmpty(params.content);
    } catch (err) {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos por enviar !!!",
      });
    }
    if (validate_title && validate_content) {
      // Crear el objeto a guardar
      const article = new Article();

      //Asignar valores

      article.title = params.title;
      article.content = params.content;

      if (params.image) {
        article.image = params.image;
      } else {
        article.image = null;
      }
      // Guardar el articulo

      article.save((err, articleStored) => {
        if (err || !articleStored) {
          return res.status(404).send({
            status: "error",
            message: "El articulo no se ha guardado",
          });
        }
        // Devolver una respuesta

        return res.status(200).send({
          status: "success",
          article: articleStored,
        });
      });
    } else {
      return res.status(200).send({
        status: "error",
        message: "Los datos no son válidos !!!",
      });
    }
  },

  getArticles: (req, res) => {
    const query = find({});

    const last = req.params.last;

    if (last || last != undefined) {
      query.limit(5);
    }
    // find
    query.sort("-_id").exec((err, articles) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al devolver los articulos !!!",
        });
      }
      if (!articles) {
        return res.status(404).send({
          status: "error",
          message: "No hay articulos para mostrar !!!",
        });
      }

      return res.status(200).send({
        status: "success",
        articles,
      });
    });
  },

  getArticle: (req, res) => {
    // Recoger el id de la url
    const articleId = req.params.id;

    // Comprobar que existe
    if (!articleId || articleId == null) {
      return res.status(404).send({
        status: "error",
        message: "No existe el articulo !!!",
      });
    }
    // buscar el articulo

    findById(articleId, (err, article) => {
      if (err || !article) {
        return res.status(404).send({
          status: "error",
          message: "No existe el articulo !!!",
        });
      }

      // Devolverlo en json
      return res.status(200).send({
        status: "success",
        article,
      });
    });
  },
  update: (req, res) => {
    // Recoger el id del articulo por la url
    const articleId = req.params.id;

    // Recoger los datos que llegan por put
    let params = req.body;

    // Validar datos
    try {
      var validate_title = !isEmpty(params.title);
      var validate_content = !isEmpty(params.content);
    } catch (err) {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos por enviar !!!",
      });
    }
    if (validate_title && validate_content) {
      // find and update

      findByIdAndUpdate(
        { _id: articleId },
        params,
        { new: true },
        (err, articleUpdated) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              message: "Error al actualizar !!!",
            });
          }
          if (!articleUpdated) {
            return res.status(404).send({
              status: "error",
              message: "No existe el articulo !!!",
            });
          }

          return res.status(200).send({
            status: "success",
            article: articleUpdated,
          });
        }
      );
    } else {
      // Devolver respuesta
      return res.status(200).send({
        status: "error",
        message: "La validación no es correcta !!!",
      });
    }
  },

  delete: (req, res) => {
    // recoger el id de la url
    const articleId = req.params.id;

    // find and delete

    findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al borrar !!!",
        });
      }

      if (!articleRemoved) {
        return res.status(404).send({
          status: "error",
          message: "No se ha borrado el articulo, posiblemente no exista !!!",
        });
      }
      return res.status(200).send({
        status: "success",
        article: articleRemoved,
      });
    });
  },
  // subir los archivos
  upload: (req, res) => {
    // Configurar el modulo connect multiparty router/article.js (hecho)

    // Recoger el fichero de la petición
    const file_name = "Imagen no subida...";

    if (!req.files) {
      return res.status(404).send({
        status: "error",
        message: file_name,
      });
    }

    // conseguir el nombre y la extension del archivo

    const file_path = req.files.file0.path;
    const file_split = file_path.split("\\");

    // * ADVERTENCIA * EN LINUX O MAC
    // var file_split = file_path.split('/')

    // Nombre del archivo
    const file_name = file_split[2];

    // Extensión del fichero
    const extension_split = file_name.split(".");
    const file_ext = extension_split[1];

    // combrobar la extension, solo imagenes, si es valida borrar el fichero
    if (
      file_ext != "png" &&
      file_ext != "jpg" &&
      file_ext != "jpeg" &&
      file_ext != "gif"
    ) {
      // borrar el archivo subido

      unlink(file_path, (err) => {
        return res.status(200).send({
          status: "error",
          message: "La extensión de la imagen no es valida!!!",
        });
      });
    } else {
      // Si todo es valido, sacando id de la url
      const articleId = req.params.id;

      if (articleId) {
        // Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
        findOneAndUpdate(
          { _id: articleId },
          { image: file_name },
          { new: true },
          (err, articleUpdated) => {
            if (err || !articleUpdated) {
              return res.status(200).send({
                status: "error",
                message: "Error al guardar la imagen de articulo !!!",
              });
            }

            return res.status(200).send({
              status: "success",
              article: articleUpdated,
            });
          }
        );
      } else {
        return res.status(200).send({
          status: "success",
          image: file_name,
        });
      }
    }

    // end upload file
  },
  getImage: (req, res) => {
    const file = req.params.image;
    const path_file = "./upload/articles/" + file;

    _exists(path_file, (exists) => {
      if (exists) {
        return res.sendFile(resolve(path_file));
      } else {
        return res.status(404).send({
          status: "error",
          message: "La imagen no existe !!!",
        });
      }
    });
  },
  search: (req, res) => {
    // Sacar el string a buscar
    const searchString = req.params.search;
    // find or

    find({
      $or: [
        { title: { $regex: searchString, $options: "i" } },
        { content: { $regex: searchString, $options: "i" } },
      ],
    })
      .sort([["date", "descending"]])
      .exec((err, articles) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error en la petición !!!",
          });
        }

        if (!articles || articles.length <= 0) {
          return res.status(404).send({
            status: "error",
            message: "No hay articulos que coincidan con tu busqueda !!!",
          });
        }

        return res.status(200).send({
          status: "success",
          articles,
        });
      });
  },
}; // end controller

export default controller;
