import React from "react";
import { getCita, getPostulanteB } from "../../request/request";
import {
  setCita,
  setPostulante,
  setRadioButton
} from "../../actions/postulanteB";
import { connect } from "react-redux";

const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();
const date = anio + "-" + mes + "-" + dia;

function compararFechas(fechaA, fechaB)
{
  
}

class FiltroFechas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citas: [],
      postulanteB: [],
      fechas:[]
    };
  }

  componentWillUpdate(pP, pS) {
    if (pP !== this.props) {
      this.getCita();
      this.getPostulanteB();
      this.ordenarFechas();
      //console.log("actualizado por Props");
    }
    if (pS === this.state) {
      this.getCita();
      this.getPostulanteB();
     // console.log("actualizado por State");
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
    this.props.dispatchSetRadioButton("Pulsado");
    //console.log("fin de handleClick");
  };

  ordenarFechas()
  {
    this.state.citas.map(c=>
      {
        this.setState({fechas:c.fecha})
      })
  }  

  render() {
    const { postulanteB } = this.state;
    //console.log("render");
    //const reload = this.reload();
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
    console.log(this.state.fechas)

    const dato = postulanteB.map(datos => {
      return datos.cita.map(cit => {
        // console.log(cit.fecha);
        // console.log(newfecha);
        if (cit.fecha === newfecha) {
          
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
        if (this.props.clickButton !== null) {
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
        }
      });
    });
    return dato;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltroFechas);
