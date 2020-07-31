"use strict";

import { Router } from "express";

import {
  datosBlog,
  test,
  save,
  getArticles,
  getArticle,
  update,
  delete as Delete,
  upload,
  getImage,
  search,
} from "../controllers/article";

const router = Router();

import multipart from "connect-multiparty";

const md_upload = multipart({ uploadDir: "./upload/articles" });

// Rutas de prueba
router.post("/datos-blog", datosBlog);
router.get("/test-de-controlador", test);

//Rutas utiles
router.post("/save", save);
router.get("/articles/:last?", getArticles);
router.get("/article/:id", getArticle);
router.put("/article/:id", update);
router.delete("/article/:id", Delete);
router.post("/upload-image/:id?", md_upload, upload);
router.get("/get-image/:image", getImage);
router.get("/search/:search", search);

export default router;
