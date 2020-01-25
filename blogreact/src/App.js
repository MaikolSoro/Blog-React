import React from "react";
import "./assets/css/styles.css";

// importar componentes

import MiComponente from "./components/MiComponente";
import Header from "./components/Header";
import Slider from "./components/Slider";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import SeccionPruebas from "./components/SeccionPruebas";
import Router from './Router';
function App() {
  return (
    <div className="App">
      <Header />
      <Slider />
      <div className="center">
        <Router/>

        <Sidebar />
        <div className="clearfix" />
      </div>
      <Footer />
    </div>
  );
}

export default App;
