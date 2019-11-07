import React, { Component } from "react";
import Icono from "../Imagenes/consultarcita.png";
import Agenda from "../Imagenes/agenda.png";
import TextField from "@material-ui/core/TextField";
import "./styles/Formatos.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCita, setPostulante } from "../actions/postulanteB";
import FiltroFechas from "./filtros/filtroFechas";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
      width: 490
    }}
  />
);

const fecha = new Date();
//console.log(fecha);

class consultarCita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fecha: "",
      fechafinal: ""
    };
  }

  handleChangeDate = e => {
    //console.log(e.target.value);
    this.setState({ fecha: e.target.value });
  };

  handleChangeDateFinal = e => {
    //console.log(e.target.value);
    this.setState({ fechafinal: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <br />
        <div align="center">
          <td>
            <ColoredLine color="black" />
          </td>
          <td>
            <img className="imagenAgenda" src={Agenda} alt="consultaCita" />
          </td>
          <td>
            <ColoredLine color="black" />
          </td>
        </div>
        <br />
        <div className="text-center">
          <TextField
            label="Fecha Actual"
            type="date-local"
            defaultValue={
              fecha.getDate() +
              "/" +
              (fecha.getMonth() + 1) +
              "/" +
              fecha.getFullYear()
            }
            disabled
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <br />
        {/** Botones de Consulta por Fechas*/}
        <div className="col-md-6 offset-md-4">
          <form>
            <div className="form-row align-items-center">
              <td>
                <div>
                  <TextField
                    label="Fecha Inicial"
                    type="date"
                    onChange={this.handleChangeDate}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
              </td>
              <td>
                <div>
                  <TextField
                    label="Fecha Final"
                    type="date"
                    onChange={this.handleChangeDateFinal}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
              </td>
              <td>
                <div>
                  <img src={Icono} className="logoBuscar" />
                </div>
              </td>
            </div>
          </form>
        </div>

        {/**Botones de Busqueda Diversos */}
        <br />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-md-3">
              <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mr-2" role="group">
                  <Link to="/agregar_comentario" className="btn btn-primary">
                    Agregar Comentarios
                  </Link>
                </div>
                <div className="btn-group mr-2" role="group">
                  <Link to="/agendar_cita" className="btn btn-info">
                    Reagendar
                  </Link>
                </div>
                <div className="btn-group mr-2" role="group">
                  {/* <button type="button" className="btn btn-info">
                    Entrevistas
                  </button> */}
                  <Link to="/Entrevista" className="btn btn-info">
                    {" "}
                    Entrevistas
                  </Link>
                </div>
                <div className="btn-group mr-2" role="group">
                  <Link to="/examen" className="btn btn-info">
                    Exámenes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/** Tabla con resultados de la Consulta */}
        <br />
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">seleccion</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Entrevistador</th>
                    <th scope="col">Comentarios</th>
                    <th scope="col">status</th>
                  </tr>
                </thead>
                <tbody>
                  <FiltroFechas
                    fecha={this.state.fecha}
                    fechafinal={this.state.fechafinal}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchSetCita: value => dispatch(setCita(value)),
  dispatchSetPostulante: value => dispatch(setPostulante(value))
});

export default connect(
  null,
  mapDispatchToProps
)(consultarCita);
