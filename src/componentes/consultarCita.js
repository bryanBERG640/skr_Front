import React, { Component } from "react";
import Icono from "../Imagenes/consultarcita.png";
import { getCita } from "../request/request";

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

const fecha = new Date().toString();

export default class consultarCita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postulanteB: []
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

  render() {
    const dato = this.state.postulanteB.map(datos => {
      return datos.cita.map(cit => {
        const valor = cit.estatuscita.id_estatus_cita;
        if (valor === 1) {
          return (
            <tr name="citaPB" onDoubleClick={() => this.selectCita()}>
              <th>
                {datos.nombre + " " + datos.apellido1 + " " + datos.apellido2}
              </th>
              <td
                value={datos.id_postulante_b}
                onDoubleClick={() => this.selectCita(datos.id_postulante_b)}
              >
                {datos.perfil.descripcion}
              </td>
              <td>{datos.estatuspostulante.descripcion}</td>
              <td>{cit.entrevistador}</td>
              <td>{cit.fecha}</td>
              <td>
                <label>
                  <input className="form-check-input" type="checkbox" checked />
                </label>
              </td>
            </tr>
          );
        } else {
          return (
            <tr name="citaPB" onDoubleClick={() => this.selectCita()}>
              <th>
                {datos.nombre + " " + datos.apellido1 + " " + datos.apellido2}
              </th>
              <td
                value={datos.id_postulante_b}
                onDoubleClick={() => this.selectCita(datos.id_postulante_b)}
              >
                {datos.perfil.descripcion}
              </td>
              <td>{datos.estatuspostulante.descripcion}</td>
              <td>{cit.entrevistador}</td>
              <td>{cit.fecha}</td>
              <td>
                <label>
                  <input className="form-check-input" type="checkbox" />
                </label>
              </td>
            </tr>
          );
        }
      });
    });
    return (
      <React.Fragment>
        <div align="center">
          <td>
            <ColoredLine color="black" />
          </td>
          <td>
            <img className="consultaCita" src={Icono} alt="consultaCita" />
          </td>
          <td>
            <ColoredLine color="black" />
          </td>
        </div>
        <footer className="blockquote-footer text-center">
          <h4>{fecha}</h4>
        </footer>

        {/** Botones de Consulta por Fechas*/}
        <div className="col-md-6 offset-md-4">
          <form>
            <div className="form-row align-items-center">
              <div className="col-auto">
                <input
                  type="date"
                  className="form-control mb-2"
                  id="inlineFormInput"
                />
              </div>
              <div className="col-auto">
                <input
                  type="date"
                  className="form-control mb-2"
                  id="inlineFormInput"
                />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-2">
                  Consultar
                </button>
              </div>
            </div>
          </form>
        </div>

        {/**<h2 className="Title text-center">Consultar Cita</h2>*/}
        {/**Botones de Busqueda Diversos */}
        <br />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-md-3">
              <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mr-2" role="group">
                  <button type="button" className="btn btn-primary btn-lg">
                    Agregar Comentarios
                  </button>
                </div>
                <div className="btn-group mr-2" role="group">
                  <button type="button" className="btn btn-info">
                    Re agendar
                  </button>
                </div>
                <div className="btn-group mr-2" role="group">
                  <button type="button" className="btn btn-info">
                    Entrevistas
                  </button>
                </div>
                <div className="btn-group mr-2" role="group">
                  <button type="button" className="btn btn-info">
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
                    <th scope="col">Nombre</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Entrevistador</th>
                    <th scope="col">Comentarios</th>
                    <th scope="col">Asistió</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      value="Jose"
                      onDoubleClick={() => this.selectCita()}
                    >
                      Jose Luis Valtierra Pizano
                    </th>
                    <td value="07-09-2019">07/09/2019</td>
                    <td>9:30</td>
                    <td>Lic. Amparo Torres</td>
                    <td>Mala actitud</td>
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked=""
                      />
                    </td>
                  </tr>
                  {dato}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
