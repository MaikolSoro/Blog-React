import React, { Component } from "react";
import axios from "axios";
import Global from '../Global';
import imagen from "../assets/images/default.png";
class Articles extends Component {

   url = Global.url;
    
  state = {
    articles: [],
    status: null
  }

  componentDidMount() {
    {
      /*Antes de imprimir la vista cargame el metodo*/
    }
    this.getArticles();
  }
  getArticles = () => {
    axios.get(this.url+"articles").then(res => {
      this.setState({
        articles: res.data.articles,
        status: "success"
      });
      console.log(this.State);
    });
    console.log("get articles");
  };
  render() {

    if (this.state.articles.length >= 1) {

     var listArticles = this.state.articles.map((article)=>{
        return(
            <article className="article-item" id="article-template">
            <div class="image-wrap">

            {article.image !== null ?(

                <img src={this.url+'get-image/'+ article.image} alt={article.title} />


            ):(
                <img src={imagen} alt={article.title} />
            )
            

            }
             </div>
             <h2>{article.title}</h2>
                <span className="date">
                {article.date}
                </span>
             <a href="#">Leer más</a>

             <div className="clearfix"></div>
        </article>
        );
     });

      return (
        <div id="articles">
          <h1>{listArticles}</h1>
        </div>
      );
    } else if (this.state.articles.length === 0 && this.state.status === "success") {
      return (
        <div id="articles">
          <h2 className="subheader">No hay artículos para mostrar</h2>
          <p>Todavía no hay contenido en está sección</p>
        </div>
      );
    }else{
        return(
      <div id="articles">
        <h2 className="subheader">Cargando....</h2>
        <p>Espere mientras carga el contenido</p>
      </div>
        );
    }
  }
}

export default Articles;
