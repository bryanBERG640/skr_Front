import React, { Component } from "react";
import Icono from "../Imagenes/postulantes.png";
import "./styles/Formatos.css";
import "./styles/FormatoImagenes.css";
import lupa from "../Imagenes/lupa.png";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import FiltrosPB from "./filtros/filtrosPB";
import { getPerfil } from "../request/request";
import Agendar from "../componentes/agendar";
import { connect } from "react-redux";

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

class consulta_PB extends Component {
  state = {
    respPerf: [],
    perfil: "",
    nombre: "",
    apellido1: "",
    apellido2: ""
  };

  constructor(props) {
    super(props);
  }

  handleSelect = e => {
    //console.log(e.target.value);
    this.setState({ perfil: e.target.value });
  };

  handleClick = e => {
    console.log(this.props.nombre);
  };

  handleWrite = e => {
    //console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("form submit");
    console.log(this.state.perfil);
    console.log(this.state.nombre);
    console.log(this.state.apellido1);
    console.log(this.state.apellido2);
  };

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
    /*const { PBSeleccionReducer } = this.props;

    console.log(PBSeleccionReducer);*/

    const { postulanteB } = this.props;
    console.log(postulanteB);

    const { respPerf, c } = this.state;

    const handleSelect = respPerf.map(perf => {
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
          <form className="form-post" onSubmit={this.handleSubmit}>
            <div className="col">
              <label>Perfil: </label>
              <select
                className="form-control"
                value={this.state.value}
                onChange={this.handleSelect}
              >
                <option>Perfiles</option>
                {handleSelect}
              </select>
            </div>
            <div className="col">
              <label>Nombre(s): </label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                onChange={this.handleWrite}
                value={this.state.nombre}
              />
            </div>
            <div className="col">
              <label>Apellido Paterno: </label>
              <input
                className="form-control"
                type="text"
                name="apellido1"
                onChange={this.handleWrite}
                value={this.state.apellido1}
              />
            </div>
            <div className="col">
              <label>Apellido Materno: </label>
              <input
                type="text"
                className="form-control"
                name="apellido2"
                onChange={this.handleWrite}
                value={this.state.apellido2}
              />
            </div>
            <div className="col">
              <Button type="submit" onClick={this.handleClick}>
                <img className="lupa" src={lupa} alt="consulta" />
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
              <Link
                to="/agendar_cita"
                className="btn btn-primary"
                //onClick={this.handleClick}
                // value={this.props.nombre}
              >
                Agendar
              </Link>
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
                <th width="10%">seleccionar</th>
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
              <FiltrosPB
                perfil={this.state.perfil}
                nombre={this.state.nombre}
                apellido1={this.state.apellido1}
              />
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

/*const mapStateToProps = state => {
  return {
    postulante: state.postulante
  };
};

export default connect(
  mapStateToProps,
  null
)(consulta_PB);*/

const mapStateToProps = state => {
  return {
    postulanteB: state.postulanteB
    //PBSeleccionReducer: state.PBSeleccionReducer
  };
};

const wrapper = connect(mapStateToProps);
const component = wrapper(consulta_PB);

export default component;
