"use strict";

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const ArticleSchema = Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  image: String,
});

export default model("Article", ArticleSchema);
// articles --> guarda documentos de este tipo y con estructura dentro de la colección
