import React, { Component } from "react";
import logo from "../assets/images/react.svg";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header id="header">
        <div className="center">
          {/*!-- LOGO */}
          <div id="logo">
            <img src={logo} className="app-logo" alt="Logotipo" />
            <span id="brand">
              <strong>Blog</strong>React
            </span>
          </div>

          {/*!-- MENU --*/}
          <nav id="menu">
            <ul>
              <li>
                <NavLink to="/home" activeClassName="active">Inicio</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/formulario">Formulario</NavLink>
              </li>
            </ul>
          </nav>

          {/*LIMPIAR FLOTADOS*/}
          <div className="clearfix" />
        </div>
      </header>
    );
  }
}

export default Header;
