import React, { Component } from "react";
import Icono from "../Imagenes/postulantes.png";
import "./styles/Formatos.css";
import "./styles/FormatoImagenes.css";
import lupa from "../Imagenes/lupa.png";
import lapiz from "../Imagenes/lapiz.png";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Fildef from "./filtros/PB";
import { getPerfil } from "../request/request";

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

function Boton() {
  console.log("click");
  return 1;
}

function Datos() {
  const c = 0;
  switch (c) {
    case 0:
      return <Fildef />;
  }
}

export default class consulta_PB extends Component {
  state = {
    respPerf: [],

    nom: "",
    A1: "",
    A2: ""
  };

  handleSelect(event) {
    console.log(event.target.value);
  }

  handleClick(event) {
    console.log(event.target.nom);
    console.log("click");
  }

  handleWrite(event) {
    console.log(event.target.value);
  }

  componentWillMount = () => {
    this.getPerfil();
  };
  getPerfil = async () => {
    const nuevoGet = await getPerfil();
    this.setState({
      respPerf: nuevoGet.data
    });
  };

  render() {
    const { respPerf } = this.state;

    const perfiles = respPerf.map(perf => {
      return <option>{perf.descripcion}</option>;
    });

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

        <div>
          <h2 className="titulo">Consultar Postulantes</h2>
        </div>

        <div className="row">
          <form className="form-post">
            <div className="col">
              <label>Perfil: </label>
              <select
                className="form-control"
                value={this.state.value}
                onChange={this.handleSelect}
              >
                <option>Perfiles</option>
                {perfiles}
              </select>
            </div>
            <div className="col">
              <label>Nombre(s): </label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                onChange={this.handleWrite}
                value={this.state.value}
                nom={this.state.value}
              />
            </div>
            <div className="col">
              <label>Apellido Paterno: </label>
              <input className="form-control" type="text" name="nombre" />
            </div>
            <div className="col">
              <label>Apellido Materno: </label>
              <input type="text" className="form-control" name="nombre" />
            </div>
            <div className="col">
              <Button onClick={this.handleClick}>
                <img className="lupa" src={lupa} alt="consulta" height="50px" />
              </Button>
            </div>
          </form>

          <br />

          <form className="form-hor" role="form">
            <div className="form-group">
              <Link to="/agregar_PB" className="btn btn-primary">
                Agregar Postulante
              </Link>
              &nbsp; &nbsp;
              <button type="button" className="btn btn-primary">
                Completar Datos
              </button>
              &nbsp; &nbsp;
              <button type="button" className="btn btn-primary">
                Agendar
              </button>
              &nbsp; &nbsp;
              <Link to="/Ficha-Postulante" className="btn btn-primary">
                Mostrar Ficha
              </Link>
              &nbsp; &nbsp;
            </div>
          </form>
        </div>
        <div>
          <table className="mt-4">
            <thead>
              <tr>
                <th width="15%">Nombre</th>
                <th width="10%">Telefono</th>
                <th width="10%">Celular</th>
                <th width="15%">Correo</th>
                <th width="10%">Perfil</th>
                <th width="10%">Estatus</th>
                <th width="5%">Editar</th>
              </tr>
            </thead>
            <tbody>
              <Datos />
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
