import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// COMPONENTES PARA LAS NAVEGACIÓN
import MiComponente from "./components/MiComponente";
import Error from "./components/Error";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SeccionPruebas from "./components/SeccionPruebas";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Formulario from "./components/Formulario";
import Articulo from "./components/Articulo";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        {/*Configurar las rutas de las páginas*/}
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/blog/articulo/:id" component={Articulo} />
          <Route exact path="/formulario" component={Formulario} />
          <Route exact path="/ruta-prueba" component={MiComponente} />

          <Route component={Error} />
        </Switch>
       
        <div className="clearfix" />
        <Footer />
      </BrowserRouter>
    );
  }
}
export default Router;
