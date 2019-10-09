import React, { Component } from "react";
import Icono from "../Imagenes/consultarcita.png";
import Agenda from "../Imagenes/agenda.png";
import { getCita } from "../request/request";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./styles/Formatos.css";
import { Link } from "react-router-dom";

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
console.log(fecha);

export default class consultarCita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postulanteB: [],
      fecha: "",
      fechafinal: ""
    };
  }

  async componentDidMount() {
    this.getCitas();
  }

  getCitas = async () => {
    const citas = await getCita();
    this.setState({
      postulanteB: citas.data
    });
    //console.log(citas.data[0].cita);
  };

  selectCita = e => {
    console.log(e.value);
  };

  handleChangeDate = e => {
    console.log(e.target.value);
    this.setState({ fecha: e.target.value });
  };

  handleChangeDateFinal = e => {
    console.log(e.target.value);
    this.setState({ fechafinal: e.target.value });
  };

  render() {
    const { postulanteB } = this.state;
    const dato = postulanteB.map(datos => {
      return datos.cita.map(cit => {
        if (
          cit.fecha === this.state.fecha ||
          cit.fecha === this.state.fechafinal
        ) {
          return (
            <tr name="citaPB" onDoubleClick={() => this.selectCita()}>
              <th>
                {datos.nombre + " " + datos.apellido1 + " " + datos.apellido2}
              </th>
              <td
                value={datos.id_postulante_b}
                onDoubleClick={() => this.selectCita(datos.id_postulante_b)}
              >
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
                  <Button className="logoBuscar">
                    <img src={Icono} />
                  </Button>
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
                  <button type="button" className="btn btn-info">
                    Entrevistas
                  </button>
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
