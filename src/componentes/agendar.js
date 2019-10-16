import React from "react";
import IconoAgendar from "../Imagenes/agendarcita.png";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postCita } from "../request/request";
import { setCita } from "../actions/postulanteB";

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

class agendar extends React.Component {
  state = {
    fecha: "",
    cita: {
      fecha: "",
      hora: "",
      entrevistador: "",
      idEstatusCita: 4,
      idPostulante: this.props.postulante.id_postulante_b
    },
    c: this.props.cita
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

  handleClick = e => {
    if (this.state.c !== "vacio") {
      let upd = this.state.c;
      upd.estatuscita.id_estatus_cita = 3;
      this.setState({ c: upd });
    }
  };

  render() {
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
                </select>
              </div>
              <div className="col">
                <label className="label1">Cliente:</label>
                <input
                  className="form-control"
                  name="entrevistador"
                  type="text"
                  value={this.state.entrevistador}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="label1">Entrevistador:</label>
                <input
                  className="form-control"
                  name="entrevistador"
                  type="text"
                  value={this.state.entrevistador}
                  onChange={this.handleChange}
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
          </form>&nbsp; &nbsp;&nbsp; &nbsp;
          <div className="row"></div>
            <form >
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
              <Link className="btn btn-primary" onClick={this.handleClick}>
                  agendar
              </Link>
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
    cita: state.cita

  };
};

const mapDispatchToProps = dispatch => ({
  dispatchSetCita: value => dispatch(setCita(value))
});

export default connect(
  mapStateToProps,
  null)(agendar);


