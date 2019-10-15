import React from "react";
import IconoAgendar from "../Imagenes/agendarcita.png";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postCita, putCita } from "../request/request";
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
      putCita(
        this.state.c,
        3,
        this.props.postulante.id_postulante_b,
        this.state.c.id_cita
      )
        .then(response => {
          console.log(response);
        })
        .catch(console.log);
    }
    postCita(
      this.state.cita,
      this.state.cita.idEstatusCita,
      this.state.cita.idPostulante
    )
      .then(response => {
        console.log(response);
      })
      .catch(console.log);
  };

  render() {
    //console.log(this.state.c);
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
            <br />
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
              <a
                className="btn btn-primary"
                href="/consultarCita"
                onClick={this.handleClick}
              >
                agendar
              </a>
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

const mapStateToProps = state => {
  return {
    postulante: state.postulante,
    cita: state.cita
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchSetCita: value => dispatch(setCita(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(agendar);
