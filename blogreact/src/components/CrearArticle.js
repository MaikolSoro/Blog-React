import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Global from "../Global";
import Sidebar from "./Sidebar";

// validacion de los formularios y alertas
class CrearArticle extends Component {

    titleRef = React.createRef();
    contentRef = React.createRef();
    
    state = {
        user: {},
        status:null
      };

      changeState= ()=>{
         this.setState({
            article:{
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
         });
      }
    saveArticle = e =>{
      e.preventDefault();

      // Rellenar  state con el formulario
      this.changeState();
    }
   
  render() {
    return (
      <div className="center">
        <section id="content">
          <h2 className= "subheader">Crear Artículo</h2>
          <form  className="mid-form" onSubmit={this.saveArticle}>

          <div className="form-group">
          <label htmlFor="title">Tíulo</label>
          <input type="text" name="title"  ref={this.titleRef} onChange={this.ChangeState}/>
          </div>

          <div className="form-group">
          <label htmlFor="content">Contenido</label>
          <textarea name="content" ref={this.contentRef} onChange={this.ChangeState}></textarea>
          </div>

          <div className="form-group">
          <label htmlFor="File0">Imagen</label>
          <input type="file" name="file0"></input>
          </div>
            <input type="submit" value ="Guardar" className="btn btn-success"/>
          </form>
        </section>
        <Sidebar/>
      </div>
    );
  }
}
export default CrearArticle;
