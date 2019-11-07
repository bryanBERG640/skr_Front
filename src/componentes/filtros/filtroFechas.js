import React from "react";
import { getCita, getPostulanteB } from "../../request/request";

const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();
const date = anio + "/" + mes + "/" + dia;

class FiltroFechas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citas: [],
      postulanteB: []
    };
  }

  componentDidUpdate(pP, pS) {
    if (pP !== this.props) {
      this.getCita();
      this.getPostulanteB();
    }
  }

  getCita = async () => {
    const cit = await getCita();
    this.setState({
      citas: cit.data
    });
  };

  getPostulanteB = async () => {
    const post = await getPostulanteB();
    this.setState({ postulanteB: post.data });
  };

  handleClick = e => {
    let sc = parseInt(e.target.value);
    this.state.citas.map(cit => {
      if (sc === cit.id_cita) {
        this.props.dispatchSetCita(cit);
      }
    });
    this.state.postulanteB.map(post => {
      post.cita.map(cit => {
        if (sc === cit.id_cita) {
          this.props.dispatchSetPostulante(post);
        }
      });
    });
    //console.log("fin de handleClick");
  };

  render() {
    const { postulanteB } = this.state;
    //const reload = this.reload();
    const dato = postulanteB.map(datos => {
      return datos.cita.map(cit => {
        if (cit.fecha === date) {
          return (
            <tr name="citaPB">
              <th>
                <input
                  type="radio"
                  name="seleccion"
                  value={cit.id_cita}
                  onClick={this.handleClick}
                />
              </th>
              <th>
                {datos.nombre + " " + datos.apellido1 + " " + datos.apellido2}
              </th>
              <td>{cit.fecha}</td>
              <td>{cit.hora}</td>
              <td>{cit.entrevistador}</td>
              <td>{cit.observaciones}</td>
              <td>
                <label>{cit.estatuscita.descripcion}</label>
              </td>
            </tr>
          );
        }
        if (
          cit.fecha >= this.props.fecha &&
          cit.fecha <= this.props.fechafinal
        ) {
          return (
            <tr name="citaPB">
              <th>
                <input
                  type="radio"
                  name="seleccion"
                  value={cit.id_cita}
                  onClick={this.handleClick}
                />
              </th>
              <th>
                {datos.nombre + " " + datos.apellido1 + " " + datos.apellido2}
              </th>
              <td>{cit.fecha}</td>
              <td>{cit.hora}</td>
              <td>{cit.entrevistador}</td>
              <td>{cit.observaciones}</td>
              <td>
                <label>{cit.estatuscita.descripcion}</label>
              </td>
            </tr>
          );
        }
      });
    });
    return dato;
  }
}

export default FiltroFechas;
