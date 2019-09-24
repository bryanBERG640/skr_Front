import React, { Component } from "react";
import Icono from "../Imagenes/postulantes.png";
import "./styles/Formatos.css";
import "./styles/FormatoImagenes.css";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
      width: 500
    }}
  />
);

export default class consula_PB extends Component {
  render() {
    return (
      <React.Fragment>
        <div align="center">
          <td>
            <ColoredLine color="black" />
          </td>
          <td>
            <img className="postulantes" src={Icono} alt="postulantes" />
          </td>
          <td>
            <ColoredLine color="black" />
          </td>
        </div>
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

          <div>
            <label>Apellido Paterno: </label>
            <input className="field" type="text" name="nombre" />
          </div>

          <div>
            <label>Apellido Materno: </label>
            <input className="field" type="text" name="nombre" />
          </div>

          <div>
            <button>Agregar Postulante</button>
            <button>Completar Datos</button>
            <button>Agendar</button>
            <button>Mostrar Ficha</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
