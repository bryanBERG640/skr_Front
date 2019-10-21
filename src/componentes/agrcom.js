import React from "react";
import IconAge from "../Imagenes/agenda.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { putCita } from "../request/request";

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

const ColoredLine2 = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
      width: 400
    }}
  />
);

class agrcom extends React.Component {
  state = {
    cita: this.props.cita
  };

  handleSelect = e => {
    let iec = parseInt(e.target.value);
    let cit = this.state.cita;
    cit.idEstatusCita = iec;
    this.setState({ cita: cit });
  };

  handleChange = e => {
    let cit = this.state.cita;
    cit.observaciones = e.target.value;
    this.setState({ cita: cit });
  };

  handleClick = e => {
    // console.log(this.state.cita);
    // console.log(this.state.cita.idEstatusCita);
    // console.log(this.props.postulante.id_postulante_b);
    // console.log(this.state.cita.empresa.id_empresa);
    // console.log(this.state.cita.cliente.id_cliente);
    // console.log(this.state.cita.id_cita);
    putCita(
      this.state.cita,
      this.state.cita.idEstatusCita,
      this.props.postulante.id_postulante_b,
      this.state.cita.empresa.id_empresa,
      this.state.cita.cliente.id_cliente,
      this.state.cita.id_cita
    )
      .then(response => {
        console.log(response);
      })
      .catch(console.log);
  };

  render() {
    //console.log(this.state.cita);
    return (
      <React.Fragment>
        <br />
        <div align="center">
          <td>
            <ColoredLine color="black" />
          </td>
          <td>
            <img className="agci" src={IconAge} alt="consultaCita" />
          </td>
          <td>
            <ColoredLine color="black" />
          </td>
        </div>
        <br />
        <div align="center">
          <td>
            <ColoredLine2 color="blue" />
          </td>
          <td>
            <h3 className="label1">
              &nbsp;
              {this.props.postulante.nombre +
                " " +
                this.props.postulante.apellido1 +
                " " +
                this.props.postulante.apellido2}
            </h3>
          </td>
          <td>
            <ColoredLine2 color="blue" />
          </td>
        </div>

        <form className="form-agendar">
          <div className="row">
            <div className="col">
              <h3>
                Entrevistador: &nbsp; &nbsp;
                <label className="datosCita">
                  {" "}
                  {this.props.cita.entrevistador}
                </label>
              </h3>
            </div>
          </div>
        </form>
        <form className="form-agendar">
          <div className="row">
            <div className="col">
              <h3>
                Fecha: &nbsp; &nbsp;
                <label className="datosCita">{this.props.cita.fecha}</label>
              </h3>
            </div>
            <div className="col">
              <h3>
                Hora: &nbsp; &nbsp;
                <label className="datosCita">{this.props.cita.hora}</label>
              </h3>
            </div>
          </div>
        </form>
        <form className="form-agendar">
          <div className="row">
            <div className="radio">
              <h4>
                <input
                  type="radio"
                  name="estatus"
                  value={4}
                  onClick={this.handleSelect}
                />
                &nbsp; &nbsp; Completada
              </h4>
            </div>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <div className="radio">
              <h4>
                <input
                  type="radio"
                  name="estatus"
                  value={3}
                  onClick={this.handleSelect}
                />
                &nbsp; &nbsp; Cancelada
              </h4>
            </div>
          </div>
        </form>
        <form className="form-agendar">
          <div className="row">
            <h4>
              Comentarios:
              <div>
                <textarea
                  class="cajatext"
                  rows="3"
                  value={this.state.comentarios}
                  onChange={this.handleChange}
                ></textarea>
              </div>
            </h4>
          </div>
        </form>
        <form className="form-agendar">
          <div className="row">
            <a
              href="/consultarCita"
              className="btn btn-primary"
              onClick={this.handleClick}
            >
              Guardar
            </a>
            &nbsp; &nbsp;
            <Link to="/consultarCita" className="btn btn-secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cita: state.cita,
    postulante: state.postulante
  };
};

export default connect(
  mapStateToProps,
  null
)(agrcom);
