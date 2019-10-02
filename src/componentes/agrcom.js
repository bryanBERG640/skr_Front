import React from "react";
import IconAge from "../Imagenes/agenda.png";
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
  render() {
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
            <label className="label1">NOMBRE</label>
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
                <label className="datosCita"> NOMBRE-ENTREVISTADOR</label>
              </h3>
            </div>
          </div>
        </form>
        <form className="form-agendar">
          <div className="row">
            <div className="col">
              <h3>
                Fecha: &nbsp; &nbsp;
                <label className="datosCita">dd/mm/aaaa</label>
              </h3>
            </div>
            <div className="col">
              <h3>
                Hora: &nbsp; &nbsp;
                <label className="datosCita">hh:mm</label>
              </h3>
            </div>
          </div>
        </form>
        <form className="form-agendar">
          <div className="row">
            <div className="radio">
              <h4>
                <input type="radio" name="estatus" />
                &nbsp; &nbsp; Completada
              </h4>
            </div>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <div className="radio">
              <h4>
                <input type="radio" name="estatus" />
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
                <textarea class="cajatext" rows="3"></textarea>
              </div>
            </h4>
          </div>
        </form>
        <form className="form-agendar">
          <div className="row">
            <Link to="/consultarCita" className="btn btn-primary">
              Guardar
            </Link>
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

export default agrcom;
