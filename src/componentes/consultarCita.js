import React, { Component } from "react";
import Icono from "../Imagenes/consultarcita.png";
import Agenda from "../Imagenes/agenda.png";
import { getCita, getPostulanteB } from "../request/request";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./styles/Formatos.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCita, setPostulante } from "../actions/postulanteB";

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
      postulanteB: [],
      citas: [],
      fecha: "",
      fechafinal: ""
    };
  }

  async componentDidMount() {
    this.getPostulanteB();
    this.getCitas();
  }

  getCitas = async () => {
    const cit = await getCita();
    this.setState({
      citas: cit.data
    });
    //console.log(citas.data[0].cita);
  };

  getPostulanteB = async () => {
    const post = await getPostulanteB();
    this.setState({ postulanteB: post.data });
  };

  selectCita = e => {
    console.log(e.value);
  };

  handleChangeDate = e => {
    //console.log(e.target.value);
    this.setState({ fecha: e.target.value });
  };

  handleChangeDateFinal = e => {
    //console.log(e.target.value);
    this.setState({ fechafinal: e.target.value });
  };

  handleClick = e => {
    let sc = parseInt(e.target.value);
    this.state.citas.map(cit => {
      if (sc === cit.id_cita) {
        this.props.dispatchSetCita(cit);
      }
    });
    this.state.postulanteB.map(post => {
      post.cita.map(cit => {
        if (sc === cit.id_cita) {
          this.props.dispatchSetPostulante(post);
        }
      });
    });
    //console.log("fin de handleClick");
  };

  render() {
    const { postulanteB } = this.state;
    //const reload = this.reload();
    const dato = postulanteB.map(datos => {
      return datos.cita.map(cit => {
        if (
          cit.fecha === this.state.fecha ||
          cit.fecha === this.state.fechafinal
        ) {
          return (
            <tr name="citaPB" onDoubleClick={() => this.selectCita()}>
              <th>
                <input
                  type="radio"
                  name="seleccion"
                  value={cit.id_cita}
                  onClick={this.handleClick}
                />
              </th>
              <th>
                {datos.nombre + " " + datos.apellido1 + " " + datos.apellido2}
              </th>
              <td>
                {cit.fecha}
              </td>
              <td>{cit.hora}</td>
              <td>{cit.entrevistador}</td>
              <td>{cit.observaciones}</td>
              <td>
                <label>{cit.estatuscita.descripcion}</label>
              </td>
            </tr>
          );
        }
      });
    });
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
                    <img src={Icono} className="logoBuscar"/>
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
                  <Link to="/Entrevista" className="btn btn-info"> Entrevistas</Link>
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
                <tbody>{dato}</tbody>
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
