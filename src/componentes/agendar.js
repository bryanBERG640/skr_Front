import React from "react";
import IconoAgendar from "../Imagenes/agendarcita.png";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postCita, putCita } from "../request/request";
import { setCita } from "../actions/postulanteB";
import { getEmpresa, getCliente } from "../request/request";
import { clickCompletarDatos } from "../actions/postulanteB";
import Autocompletado from "./Autocompletado/Autocommpletado";
import "./styles/FormatoImagenes.css";
import { number } from "prop-types";

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
const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();
const date = anio + "-" + mes + "-" + dia;

class agendar extends React.Component {
  constructor(args) {
    super(args);
    this.state = {
      clientes: [],
      respEmpr: [],
      fecha: "",
      idEmpresa: number,
      idCliente: this.props.cliente.id_cliente,
      cita: {
        fecha: "",
        hora: "",
        entrevistador: "",
        idEstatusCita: 1,
        idPostulante: this.props.postulante.id_postulante_b,
        usuario_actualiza: "Bryan Ramirez",
        fecha_actualizacion: date
      },
      c: this.props.cita
    };
  }

  componentWillMount = () => {
    this.getCliente();
    this.getEmpresa();
  };
  getCliente = async () => {
    const nuevoGet = await getCliente();
    this.setState({ clientes: nuevoGet.data });
  };
  getEmpresa = async () => {
    const nuevoGet = await getEmpresa();
    this.setState({ respEmpr: nuevoGet.data });
  };

  handleChange = e => {
    //console.log(e.target.value);
    let cit = this.state.cita;
    cit.entrevistador = e.target.value;
    this.setState({ cita: cit });
  };

  handleChangeDate = e => {
    //console.log(e.target.value);
    let cit = this.state.cita;
    cit.fecha = e.target.value;
    this.setState({ cita: cit });
  };

  handleChangeTime = e => {
    //console.log(e.target.value);
    let cit = this.state.cita;
    cit.hora = e.target.value + ":00";
    this.setState({ cita: cit });
  };

  handleSelect = e => {
    this.state.respEmpr.map(emp => {
      if (emp.descripcion === e.target.value) {
        this.setState({ idEmpresa: emp.id_empresa });
      }
    });
  };

  handleClick = e => {
    let idCliente = this.props.cliente.id_cliente;
    if (this.state.c !== "vacio") {
      console.log("Realizando put");
      // console.log(this.state.c);
      // console.log(2);
      // console.log(this.props.postulante.id_postulante_b);
      // console.log(this.state.c.id_cita);
      putCita(
        this.state.c,
        2,
        this.props.postulante.id_postulante_b,
        this.state.idEmpresa,
        idCliente,
        this.state.c.id_cita
      )
        .then(response => {
          console.log(response);
        })
        .catch(console.log);
    }

    // console.log(idCliente);
    // console.log(this.state.cita);
    // console.log(this.state.idEmpresa);
    console.log("Realizando Post")
    postCita(
      this.state.cita,
      this.state.cita.idEstatusCita,
      this.state.cita.idPostulante,
      this.state.idEmpresa,
      idCliente
    )
      .then(response => {
        console.log(response);
      })
      .catch(console.log);
  };

  handleWrite = e => {
    let cit = this.state.cita;
    if (e.target.name === "entrevistador") {
      cit.entrevistador = e.target.value;
      this.setState({ cita: cit });
    }
  };

  render() {
    const { respEmpr } = this.state;
    const empresa = respEmpr.map(empr => {
      return <option value={empr.descripcion}>{empr.descripcion}</option>;
    });
    return (
      <React.Fragment>
        <div align="center">
          <td>
            <ColoredLine color="black" />
          </td>
          <td>
            <img className="agci" src={IconoAgendar} alt="agendar cita" />
          </td>
          <td>
            <ColoredLine color="black" />
          </td>
        </div>
        <div align="center">
          <h3>
            {this.props.postulante.nombre}&nbsp;
            {this.props.postulante.apellido1}&nbsp;
            {this.props.postulante.apellido2}
          </h3>
        </div>
        <br />
        <br />
        <div className="row">
          <form className="form-agendar">
            <div className="row">
              <div className="col">
                <label>Empresa: </label>
                <select
                  className="form-control"
                  value={this.state.value}
                  onChange={this.handleSelect}
                >
                  <option>Empresas</option>
                  {empresa}
                </select>
              </div>
              <div className="col">
                <label className="label1">Cliente:</label>
                <Autocompletado valores={this.state.clientes} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="label1">Entrevistador:</label>
                <input
                  className="form-control"
                  name="entrevistador"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleWrite}
                />
              </div>
              <div className="col">
                <label className="label1">Fecha:</label>
                <TextField
                  type="date"
                  onChange={this.handleChangeDate}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
            </div>
          </form>
          <form>
            <div className="col">
              <label className="label1">Hora:</label>
              <input
                className="form-control"
                type="time"
                name="hora"
                value={this.state.hora}
                onChange={this.handleChangeTime}
              />
            </div>
            <br />
            <div>
              &nbsp; &nbsp;
              {/* <a
                className="btn btn-primary"
                href="/consultarCita"
                onClick={this.handleClick}
              >
                agendar
              </a> */}
              <button type="button"
              className="btn btn-primary"
              onClick={this.handleClick}>
                Agendar
              </button>
            </div>
            <br />
            <div>
              &nbsp; &nbsp;
              <Link to="/consultar-Postulantes" className="btn btn-primary">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

//Se accede al store de postulante y postulante. Pude usar los valores de cualquiera de los dos.
const mapStateToProps = state => {
  return {
    postulante: state.postulante,
    postulantec: state.postulantec,
    cita: state.cita,
    cliente: state.cliente,
    state: value => state(setCita(value))
  };
};

const mapDispatchProps = dispatch => ({
  dispatchClickCompletarDatos: value => dispatch(clickCompletarDatos(value))
});

export default connect(
  mapStateToProps,
  mapDispatchProps
)(agendar);
