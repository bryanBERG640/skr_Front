import React from "react";
import { number } from "prop-types";
import {
  postSecciones,
  getTipoExamen,
  getExamenes,
  getSecciones,
  deleteSeccion
} from "../../request/request";
import { connect } from "react-redux";
import TablaSecciones from "./tabla_secciones";
import { setSeccion } from "../../actions/postulanteB";

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
    respExamen: [],
    respSecciones: [],
    value: ""
  };

  componentDidUpdate(previousProps, previousState) {
    // console.log(previousProps);
    // console.log(previousState.respExamen);
    // console.log(this.state.respExamen);
    if (previousState == this.state) {
      this.getTipoExamen();
      this.getExamenes();
      this.getSecciones();
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

  getSecciones = async () => {
    const nuevoGet = await getSecciones();
    this.setState({ respSecciones: nuevoGet.data });
  };

  handleChange = e => {
    let sec = this.state.seccion;
    let vari = parseInt(e.target.value);
    console.log(vari);
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
        this.props.dispatchSetSeccion(response);
      })
      .catch(console.log);

    let secc = {
      no_seccion: number,
      puntaje: number,
      calificacion: number
    };
    this.setState({ seccion: secc });
  };

  handleDelete = e => {
    //debugger;
    deleteSeccion(this.props.seccion.id_seccion)
      .then(response => {
        console.log(response);
        this.props.dispatchSetSeccion("vacio");
      })
      .catch(console.log);
  };

  handleClean = e => {
    e.target.value = "";
  };

  render() {
    const exa = this.props.examen;
    //console.log(this.state.respExamen);

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
              <div className="col-md-3">
                * No. Sección: &nbsp;
                <input
                  className="label"
                  type="text"
                  name="seccion"
                  onChange={this.handleChange}
                  value={this.state.seccion.no_seccion}
                />
              </div>
              <div className="col-md-3">
                <label className="seccion">* Puntaje:</label>
                <input
                  className="label"
                  type="text"
                  name="puntaje"
                  onChange={this.handleChange}
                  value={this.state.seccion.puntaje}
                />
              </div>
              <div className="col-md-2.5 right">
                <label className="seccion">* calificacion:</label>
                <input
                  className="label"
                  type="text"
                  name="calificacion"
                  onChange={this.handleChange}
                  value={this.state.seccion.calificacion}
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
                      type="button"
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
            <TablaSecciones />
          </form>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div align="center">
          <td className="lineaEspacioDerecha">
            <ColoredLine color="blue" />
          </td>
          <td>
            <h2>Secciónes</h2>
          </td>
          <td className="lineaEspacioDerecha">
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
    examen: state.examen,
    seccion: state.seccion
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchSetSeccion: value => dispatch(setSeccion(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(Seccion);
