import React, { Component } from "react";
import { connect } from "react-redux"; //Sirve para conectar las librerias de react y redux, se utiliza para cada componente que se quiera dar acceso al store.
import Icono from "../Imagenes/postulantes.png";
import "./styles/Formatos.css";
import "./styles/FormatoImagenes.css";
import lupa from "../Imagenes/lupa.png";
import { Link } from "react-router-dom";
import FiltrosPB from "./filtros/filtrosPB";
import { getPerfil } from "../request/request";
//Se agregan las librerias necesarias para usar redux.
import {
  clickAgendar,
  clickBuscar,
  clickAgregarPostulante,
  clickCompletarDatos,
  clickMostrarFicha
} from "../actions/postulanteB";

//Se exporta el filtrosPBReducer para capturar el valor------------
import { filtrosPBReducer } from "../reducers/filtrosPBReducer";

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
    nombre: null,
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

  handleClickBuscar = e => {
    this.props.dispatchClickBuscar("Buscando"); //Se almacena en el store una función.
  };

  handleWrite = e => {
    console.log("-.-.-." + e.target.value);
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

  componentDidMount = () => {
    this.getPerfil();
    this.setState({ nombre: "" });
  };
  getPerfil = async () => {
    const nuevoGet = await getPerfil();
    this.setState({
      respPerf: nuevoGet.data
    });
  };

  handleClick = e => {
    this.props.dispatchClickAgendar(filtrosPBReducer); //Se almacena en el store una función.
  };

  handleClickAgregarPostulante = e => {
    this.props.dispatchClickAgregarPostulante("Agregando"); //Se almacena en el store una función.
  };

  handleClickCompletarDatos = e => {
    this.props.dispatchClickCompletarDatos("Completando"); //Se almacena en el store una función.
  };

  handleClickMostrarFicha = e => {
    this.props.dispatchClickMostrarFicha("MostrarFicha"); //Se almacena en el store una función.
  };

  render() {
    const { respPerf, c } = this.state;

    const handleSelect = respPerf.map(perf => {
      // console.log("----"  + perf.descripcion)
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
              <img className="lupa" src={lupa} alt="consulta" />
            </div>
          </form>

          <br />

          <form className="form-hor" role="form">
            <div className="form-group">
              <Link
                to="/agregar_PB"
                className="btn btn-primary"
                onClick={this.handleClickAgregarPostulante}
              >
                Agregar/Editar Postulante
              </Link>
              &nbsp; &nbsp;
              <Link
                to="/Completar_Datos_postulante"
                className="btn btn-primary"
              >
                Completar/Editar Datos
              </Link>
              &nbsp; &nbsp;
              <Link to="/agendar_cita" className="btn btn-primary">
                Agendar
              </Link>
              <Link to="/prueba-cita" className="btn btn-primary">
                PruebaAgendar
              </Link>
              &nbsp; &nbsp;
              <Link
                to="/Ficha-Postulante"
                className="btn btn-primary"
                onClick={this.handleClickMostrarFicha}
              >
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
                <th width="10%">Seleccionar</th>
                <th width="15%">Nombre</th>
                <th width="10%">Telefono</th>
                <th width="10%">Celular</th>
                <th width="15%">Correo</th>
                <th width="10%">Perfil</th>
                <th width="10%">Estatus</th>
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

const mapDispatchProps = dispatch => ({
  dispatchClickAgendar: value => dispatch(clickAgendar(value)),
  dispatchClickBuscar: value => dispatch(clickBuscar(value)),
  dispatchClickAgregarPostulante: value =>
    dispatch(clickAgregarPostulante(value)),
  dispatchClickCompletarDatos: value => dispatch(clickCompletarDatos(value)),
  dispatchClickMostrarFicha: value => dispatch(clickMostrarFicha(value))
});

export default connect(
  null,
  mapDispatchProps
)(consulta_PB); //El segundo parametro del metodo connect permitira trabajar con las acciones.
