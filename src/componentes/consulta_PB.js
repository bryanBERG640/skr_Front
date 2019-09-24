import React, { Component } from "react";
import Icono from "../Imagenes/postulantes.png";
import "./styles/Formatos.css";
import "./styles/FormatoImagenes.css";
import division from "../Imagenes/division.png";

export default class consula_PB extends Component {
  render() {
    return (
      <React.Fragment>
        <img className="divIzq" src={division} alt="div" />
        <img className="postulantes" src={Icono} alt="postulantes" />
        <img className="divDer" src={division} alt="div" />
        <h2 className="titulo">Consultar Postulantes</h2>
        <form className="form">
          <div className="form-group">
            <label>Perfil: </label>
            <select>
              <option>prueba</option>
              <option>prueba2</option>
            </select>
          </div>

          <label>Nombre(s): </label>
          <input className="field" type="text" name="nombre" />
        </form>
      </React.Fragment>
    );
  }
}
