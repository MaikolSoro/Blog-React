import React from "react";
import logo from "./assets/images/react.svg";
import "./assets/css/styles.css";

// importar componentes

import MiComponente from "./components/MiComponente";
import Header from "./components/Header";
import Slider from "./components/Slider";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Slider />
      <div className="center">
        <section id="content">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hola</p>

          <section className="componentes">
            <MiComponente />
          </section>
        </section>

        <Sidebar/>
        <div className="clearfix"></div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
