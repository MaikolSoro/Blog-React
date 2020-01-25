import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// COMPONENTES PARA LAS NAVEGACIÓN
import MiComponente from "./components/MiComponente";
import Error from './components/Error';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        {/*Configurar las rutas de las páginas*/}

        <Switch>
          <Route exact path="/ruta-prueba" component={MiComponente} />

          <Route component={Error}/>

          </Switch>
      </BrowserRouter>
    );
  }
}
export default Router;
