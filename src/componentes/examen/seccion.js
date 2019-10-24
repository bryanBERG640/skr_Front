import React from "react";
import { number } from "prop-types";
import {
  postSecciones,
  getTipoExamen,
  getExamenes
} from "../../request/request";
import { connect } from "react-redux";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
      width: 600
    }}
  />
);

const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();
const date = anio + "-" + mes + "-" + dia;

class Seccion extends React.Component {
  state = {
    idExamen: number,
    seccion: {
      no_seccion: number,
      puntaje: number,
      calificacion: number,
      usuario_actualiza: "Bryan Ramirez",
      fecha_actualizacion: date
    },
    respTipoExamen: [],
    respExamen: []
  };

  componentDidUpdate(previousProps, previousState) {
    console.log(previousProps);
    console.log(previousState);
    console.log(this.state.respExamen);
    if (previousState == this.state) {
      this.getTipoExamen();
      this.getExamenes();
      console.log("actualizando render");
    }
  }

  getTipoExamen = async () => {
    const nuevoGet = await getTipoExamen();
    this.setState({ respTipoExamen: nuevoGet.data });
  };

  getExamenes = async () => {
    const nuevoGet = await getExamenes();
    this.setState({ respExamen: nuevoGet.data });
  };

  handleChange = e => {
    let sec = this.state.seccion;
    let vari = parseInt(e.target.value);

    if (e.target.name === "seccion") {
      sec.no_seccion = vari;
      this.setState({ seccion: sec });
    }

    if (e.target.name === "puntaje") {
      sec.puntaje = vari;
      this.setState({ seccion: sec });
    }

    if (e.target.name === "calificacion") {
      sec.calificacion = vari;
      this.setState({ seccion: sec });
    }
  };

  handleClick = e => {
    postSecciones(this.state.seccion, this.props.examen.id_examen)
      .then(response => {
        console.log(response);
      })
      .catch(console.log);
  };

  render() {
    const exa = this.props.examen;
    console.log(this.state.respExamen);
    const secc = this.state.respExamen.map(sec => {
      if (sec.id_examen === exa.id_examen) {
        console.log("encontrado");
      }
    });
    if (this.props.examen !== "vacio") {
      return (
        <React.Fragment>
          <div align="center">
            <td className="lineaEspacioDerecha2">
              <ColoredLine color="blue" />
            </td>
            <td>
              <h2>Secciónes</h2>
            </td>
            <td className="lineaEspacioIzquierda2">
              <ColoredLine color="blue" />
            </td>
          </div>
          <form>
            <div align="center">
              <h3>
                {exa.tipoexamen.examen_tipo}&nbsp; &nbsp;
                <label className="datosCita">
                  {exa.tipoexamen.descripcion}
                </label>
              </h3>
            </div>

            <div className="row div">
              <div className="col-md-3 left">
                <label className="seccion">No. Sección:</label>
                <input
                  className="label"
                  type="text"
                  name="seccion"
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-3">
                <label className="seccion">Puntaje:</label>
                <input
                  className="label"
                  type="text"
                  name="puntaje"
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-2.5 right">
                <label className="seccion">calificacion:</label>
                <input
                  className="label"
                  type="text"
                  name="calificacion"
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-3">
                <div className="row">
                  <div className="col-md-5">
                    <button
                      className="btn  btn-primary right"
                      type="button"
                      value={this.state.value}
                      onClick={this.handleClick}
                    >
                      Agregar
                    </button>
                  </div>
                  <div className="col-md-2 left">
                    <button
                      className="btn  btn-danger left"
                      onClick={this.handleDelete}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="container">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">seleccion</th>
                    <th scope="col">No. seccion</th>
                    <th scope="col">Puntaje</th>
                    <th scope="col">Promedio</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </form>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div align="center">
          <td className="lineaEspacioDerecha2">
            <ColoredLine color="blue" />
          </td>
          <td>
            <h2>Secciónes</h2>
          </td>
          <td className="lineaEspacioIzquierda2">
            <ColoredLine color="blue" />
          </td>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cita: state.cita,
    examen: state.examen
  };
};

export default connect(
  mapStateToProps,
  null
)(Seccion);
