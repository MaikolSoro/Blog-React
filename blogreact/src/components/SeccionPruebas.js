import React, { Component } from 'react';

import MiComponente from '../components/MiComponente';

class SeccionPruebas extends Component {

contador = 0;
  render() {

    return (
      <section id="content">
        <h2 className="subheader">Ultimos articulos</h2>
       
        <p>
       {this.contador}
        </p>
        <p>
        <input type="button" value="Sumar"/>
        </p>
        <section className="componentes">
          <MiComponente />
        </section>
      </section>
    );
  }
}

export default SeccionPruebas;
