import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';

import Global from '../Global';
import Sidebar from './Sidebar';

// validacion de los formularios y alertas
class CrearArticle extends Component {
  url = Global.url;

  titleRef = React.createRef();
  contentRef = React.createRef();

  state = {
    user: {},
    status: null,
    selectedFile: null
  };
  componentWillMount(){
    this.validator = new SimpleReactValidator({
      messages:{
        required: 'Este campo es requerido.'
      }
    });
  }

  changeState = () => {
    this.setState({
      article: {
        title: this.titleRef.current.value,
        content: this.contentRef.current.value
      }
      
    });
    this.validator.showMessages();
    this.forceUpdate();
  }

  saveArticle = (e) => {
    e.preventDefault();

    // Rellenar  state con el formulario
    this.changeState();

    if (this.validator.allValid()) {
      // Hacer una peteción http por post para guardar los artículos.
      axios.post(this.url + "save", this.state.article).then(res => {
        if (res.data.article) {
          this.setState({
            article: res.data.article,
            status: 'waiting'
          });

          // Subir la imagen
          if (this.state.selectedFile !== null) {
            {
              /* Para subir la imagen antes hay que hacer algunas cosas
                          1. Sacar  el id del articulo guardado.
                          2. Crear form data y añadir  fichero.
                          3. Petición al ajax. */
            }

            // sacamos el id del articlo
            var articleId = this.state.article._id;

            // Se crea el form data
            const formData = new FormData();

            formData.append(
              "file0",
              this.state.selectedFile,
              this.state.selectedFile.name
            );

            // Petición de ajax por post por http
            axios
              .post(this.url + "upload-image/" + articleId, formData)
              .then(res => {
                if (res.data.article) {
                  this.setState({
                    article: res.data.article,
                    status: 'success'
                  });
                } else {
                  this.setState({
                    article: res.data.article,
                    status: 'failed'
                  });
                }
              });
          } else {
            this.setState({
              status: 'success'
            });
          }
        } else {
          this.setState({
            status: 'failed'
          });
        }
      });

    }else {
      this.setState({
        status: 'failed'
      });
      
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  fileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };
  render() {
    // Hacemos una redirección

    if (this.state.status === 'success') {
      return <Redirect to="/blog" />;
    }
    return (
      <div className="center">
        <section id="content">
          <h2 className="subheader">Crear Artículo</h2>
          <form className="mid-form" onSubmit={this.saveArticle}>
            <div className="form-group">

              <label htmlFor="title">Título</label>
              <input type="text" name="title" ref={this.titleRef} onChange={this.ChangeState} />

             {this.validator.message('title', this.state.title,'required|alpha_num_space')}
            </div>

            <div className="form-group">
              <label htmlFor="content">Contenido</label>
              <textarea
                name="content"
                ref={this.contentRef}
                onChange={this.ChangeState}
              />
              {this.validator.message('content', this.state.content,'required')}
            </div>

            <div className="form-group">
              <label htmlFor="File0">Imagen</label>
              <input type="file" name="file0" onChange={this.fileChange} />
            </div>
            <input type="submit" value="Guardar" className="btn btn-success" />
          </form>
        </section>
        <Sidebar />
      </div>
    );
  }
}
export default CrearArticle;
