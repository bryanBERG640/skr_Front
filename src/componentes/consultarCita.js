import React, { Component } from "react";
import Icono from "../Imagenes/consultarcita.png";
import Agenda from "../Imagenes/agenda.png";
import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "./styles/Formatos.css";
import { connect } from "react-redux";
import FiltroFechas from "./filtros/filtroFechas";
import {
  setCita,
  setPostulante,
  setRadioButton,
  setCliente,
  setExamen,
  setSeccion,
  setEntrevista,
  changeValor
} from "../actions/postulanteB";
import { Grid } from "@material-ui/core";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
      width: 400
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
      fechafinal: "",
      clickButton: ""
    };
  }

  componentDidMount = () => {
    //if (pS !== this.state) {
    //console.log("actualizando por state");
    this.props.dispatchSetRadioButton(null);
    this.props.dispatchSetCita("vacio");
    this.props.dispatchSetPostulante("Vacio");
    this.props.dispatchSetCliente("vacio");
    this.props.dispatchSetExamen("vacio");
    this.props.dispatchSetSeccion("vacio");
    this.props.dispatchSetEntrevista("vacio");
    this.props.dispatchSetSeleccion("vacio");

    ValidatorForm.addValidationRule("fechaInicial", string => {
      string = this.state.fecha;
      if (string <= this.state.fechafinal) return true;
      if (this.state.fecha <= this.state.fechafinal) return true;
    });

    ValidatorForm.addValidationRule("fechaFinal", string => {
      if (string >= this.state.fecha) return true;
      if (this.state.fechafinal >= this.state.fecha) return true;
    });
    this.setState({ clickButton: null });
    this.setState({ fecha: "" });
  };

  handleChangeDate = e => {
    //console.log(e.target.value);
    this.setState({ fecha: e.target.value });
  };

  handleChangeDateFinal = e => {
    //console.log(e.target.value);
    this.setState({ fechafinal: e.target.value });
  };

  handleClickPulsado = e => {
    //debugger
    if (e.target.name === "agregarcomentario") {
      this.props.history.push("/agregar_comentario");
    } else if (e.target.name === "reagendar") {
      this.props.history.push("/agendar_cita");
    } else if (e.target.name === "entrevistas") {
      this.props.history.push("/Entrevista");
    } else if (e.target.name === "examenes") {
      this.props.history.push("/examen");
    }
  };

  handleSubmit = e => {
    //e.preventDefault();
    console.log("submit");
    if (
      this.state.fecha <= this.state.fechafinal &&
      this.state.fechafinal >= this.state.fecha &&
      this.state.fecha !== "" &&
      this.state.fechafinal !== ""
    ) {
      console.log("aprobado");
      this.setState({ clickButton: "click" });
    }
  };

  render() {
    return (
      <React.Fragment>
        <br />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <ColoredLine color="black" />
          </Grid>
          <Grid item>
            <img className="imagenAgenda" src={Agenda} alt="consultaCita" />
          </Grid>
          <Grid item>
            <ColoredLine color="black" />
          </Grid>
        </Grid>
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
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <div className="form-row align-items-center">
              <td>
                <div>
                  <TextValidator
                    style={{ marginRight: 50 }}
                    label="Fecha Inicial"
                    type="date"
                    name="fecha"
                    value={this.state.fecha}
                    onChange={this.handleChangeDate}
                    InputLabelProps={{
                      shrink: true
                    }}
                    validators={["fechaInicial", "required"]}
                    errorMessages={[
                      "Debe ser una fecha Menor",
                      "Campo Obligatorio"
                    ]}
                  />
                </div>
              </td>
              <td>
                <div>
                  <TextValidator
                    style={{ marginRight: 50 }}
                    label="Fecha Final"
                    type="date"
                    name="fechaFinal"
                    value={this.state.fechafinal}
                    onChange={this.handleChangeDateFinal}
                    InputLabelProps={{
                      shrink: true
                    }}
                    validators={["fechaFinal", "required"]}
                    errorMessages={[
                      "Debe ser una fecha Mayor",
                      "Campo Obligatorio"
                    ]}
                  />
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="image"
                    src={Icono}
                    className="logoBuscar"
                    alt="Buscar"
                  />
                </div>
              </td>
            </div>
          </ValidatorForm>
        </div>

        {/**Botones de Busqueda Diversos */}
        <br />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-md-3">
              <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mr-2" role="group">
                  <button
                    className="btn btn-primary"
                    name="agregarcomentario"
                    onClick={this.handleClickPulsado}
                    disabled={!this.props.radiobutton}
                  >
                    Agregar Comentarios
                  </button>
                </div>
                <div className="btn-group mr-2" role="group">
                  <button
                    className="btn btn-primary"
                    name="reagendar"
                    onClick={this.handleClickPulsado}
                    disabled={!this.props.radiobutton}
                  >
                    Reagendar
                  </button>
                </div>
                <div className="btn-group mr-2" role="group">
                  <button
                    className="btn btn-primary"
                    name="entrevistas"
                    onClick={this.handleClickPulsado}
                    disabled={!this.props.radiobutton}
                  >
                    Entrevistas
                  </button>
                </div>
                <div className="btn-group mr-2" role="group">
                  <button
                    className="btn btn-primary"
                    name="examenes"
                    onClick={this.handleClickPulsado}
                    disabled={!this.props.radiobutton}
                  >
                    Exámenes
                  </button>
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
                    clickButton={this.state.clickButton}
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

const mapStateToProps = state => {
  return {
    radiobutton: state.radiobutton
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchSetCita: value => dispatch(setCita(value)),
  dispatchSetPostulante: value => dispatch(setPostulante(value)),
  dispatchSetRadioButton: value => dispatch(setRadioButton(value)),
  dispatchSetCliente: value => dispatch(setCliente(value)),
  dispatchSetExamen: value => dispatch(setExamen(value)),
  dispatchSetSeccion: value => dispatch(setSeccion(value)),
  dispatchSetEntrevista: value => dispatch(setEntrevista(value)),
  dispatchSetSeleccion: value => dispatch(changeValor(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(consultarCita);
