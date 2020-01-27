import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Global from "../Global";
import Sidebar from "./Sidebar";

// validacion de los formularios y alertas
class CrearArticle extends Component {
  render() {
    return (
      <div className="center">
        <section id="content">
          <h2 className= "subheader">Crear Artículo</h2>
        </section>
        <Sidebar/>
      </div>
    );
  }
}
export default CrearArticle;
