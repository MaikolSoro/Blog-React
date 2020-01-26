import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// COMPONENTES PARA LAS NAVEGACIÓN
import MiComponente from "./components/MiComponente";
import Error from './components/Error';
import Header from "./components/Header";
import Slider from "./components/Slider";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import SeccionPruebas from "./components/SeccionPruebas";
class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        {/*Configurar las rutas de las páginas*/}
        <Header />
        <Slider />
        <div className="center">
        <Switch>
            <Route exact path="/" component={MiComponente} />
            <Route exact path="/home" component={MiComponente} />
          <Route exact path="/ruta-prueba" component={MiComponente} />

          <Route component={Error}/>

          </Switch>
          <Sidebar />
        <div className="clearfix" />
      </div>
      <Footer />
      </BrowserRouter>
    );
  }
}
export default Router;
