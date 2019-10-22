import React from "react";

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
  state = {};
  render() {
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
          <div className="row div">
            <div className="col-md-3 left">
              <label className="seccion">Sección:</label>
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
                  <input
                    className="btn  btn-primary right"
                    type="submit"
                    value="Agregar"
                  ></input>
                </div>
                <div className="col-md-2 left">
                  <button className="btn  btn-danger left" onClick="#">
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
}

export default Seccion;
