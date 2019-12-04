import React from "react";
import { getCita, getPostulanteB } from "../../request/request";
import {
  setCita,
  setPostulante,
  setRadioButton
} from "../../actions/postulanteB";
import { connect } from "react-redux";
import Loading from "../paginas/Loading";

const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();

function compararFechas(fechaA, fechaB) {
  if (fechaA > fechaB) {
    return 1;
  }
  if (fechaA < fechaB) {
    return -1;
  }
  if (fechaA === fechaB) {
    return 0;
  }
}

class FiltroFechas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citas: [],
      postulanteB: [],
      fechas: [],
      isLoading: true
    };
  }

  componentDidUpdate(pP, pS) {
    if (pP !== this.props) {
      this.getCita();
      this.getPostulanteB();
      this.ordenarFechas();
      this.setState({ isLoading: false });
      //console.log("actualizado por Props");
    }
    if (pS === this.state) {
      this.getCita();
      this.getPostulanteB();
      this.setState({ isLoading: false });
      // console.log("actualizado por State");
    }
  }

  getCita = async () => {
    this.setState({ isLoading: true });
    const cit = await getCita();
    this.setState({
      citas: cit.data
    });
  };

  getPostulanteB = async () => {
    this.setState({ isLoading: true });
    const post = await getPostulanteB();
    this.setState({ postulanteB: post.data });
  };

  handleClick = e => {
    let sc = parseInt(e.target.value);
    this.state.citas.map(cit => {
      if (sc === cit.id_cita) {
        this.props.dispatchSetCita(cit);
      }
      return cit;
    });
    this.state.postulanteB.map(post => {
      return post.cita.map(cit => {
        if (sc === cit.id_cita) {
          this.props.dispatchSetPostulante(post);
        }
        return cit;
      });
    });
    this.props.dispatchSetRadioButton("Pulsado");
    //console.log("fin de handleClick");
  };

  ordenarFechas() {
    this.setState({ isLoading: true });
    let orden = this.state.citas.sort((a, b) =>
      compararFechas(a.fecha, b.fecha)
    );
    //console.log(orden);
    this.setState({ fechas: orden });
    //console.log(this.state.fechas)
  }

  render() {
    const { postulanteB, isLoading } = this.state;

    var newfecha;
    if (dia >= 1 && dia <= 9) {
      const day = "0" + dia;
      if (mes >= 1 && mes <= 9) {
        const month = "0" + mes;
        newfecha = anio + "-" + month + "-" + day;
      } else {
        newfecha = anio + "-" + mes + "-" + day;
      }
    } else {
      if (mes >= 1 && mes <= 9) {
        const month = "0" + mes;
        newfecha = anio + "-" + month + "-" + dia;
      } else {
        newfecha = anio + "-" + mes + "-" + dia;
      }
    }
    if (isLoading) return <Loading />;
    var datOrden;
    if (this.props.clickButton !== null) {
      datOrden = this.state.fechas.map(f => {
        if (f.fecha >= this.props.fecha && f.fecha <= this.props.fechafinal) {
          return postulanteB.map(datos => {
            return datos.cita.map(cit => {
              if (cit.id_cita === f.id_cita) {
                return (
                  <tr name="citaPB" key={f.id_cita}>
                    <th>
                      <input
                        type="radio"
                        name="seleccion"
                        value={f.id_cita}
                        onClick={this.handleClick}
                      />
                    </th>
                    <th>
                      {datos.nombre +
                        " " +
                        datos.apellido1 +
                        " " +
                        datos.apellido2}
                    </th>
                    <td>{f.fecha}</td>
                    <td>{f.hora}</td>
                    <td>{f.entrevistador}</td>
                    <td>{f.observaciones}</td>
                    <td>
                      <label>{f.estatuscita.descripcion}</label>
                    </td>
                  </tr>
                );
              }
              else return cit
            });
          });
        }
        else return f
      });
    } else {
      datOrden = postulanteB.map(datos => {
        return datos.cita.map(cit => {
          if (cit.fecha === newfecha) {
            return (
              <tr name="citaPB" key={cit.id_cita}>
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
          else return cit
        });
      });
    }
    return datOrden;
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
  dispatchSetRadioButton: value => dispatch(setRadioButton(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltroFechas);
