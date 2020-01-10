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
      //console.log("actualizado por State");
    }
  }

  getCita = async () => {
    this.setState({ isLoading: true });
    const cit = await getCita(this.props.auth);
    this.setState({
      citas: cit.data
    });
  };

  getPostulanteB = async () => {
    this.setState({ isLoading: true });
    const post = await getPostulanteB(this.props.auth);
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
    const { postulanteB, isLoading, fechas } = this.state;

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

    var datOrden=[];
    var x,y,z
    if (this.props.clickButton !== null)
    {
      for(x=0;x<fechas.length;x++)
      {
        if(fechas[x].fecha>=this.props.fecha && fechas[x].fecha<=this.props.fechafinal)
        {
          for(y=0; y<postulanteB.length; y++)
          {
            for(z=0; z<postulanteB[y].cita.length; z++)
            {
              if(postulanteB[y].cita[z].id_cita===fechas[x].id_cita)
              {
                datOrden[x]=<tr name="citaPB" key={fechas[x].id_cita}>
                <th>
                  <input
                    type="radio"
                    name="seleccion"
                    value={fechas[x].id_cita}
                    disabled={
                      fechas[x].estatuscita.id_estatus_cita === 2 ||
                      fechas[x].estatuscita.id_estatus_cita === 3
                    }
                    onClick={this.handleClick}
                  />
                </th>
                <th>
                  {postulanteB[y].nombre +
                    " " +
                    postulanteB[y].apellido1 +
                    " " +
                    postulanteB[y].apellido2}
                </th>
                <td>{fechas[x].fecha}</td>
                <td>{fechas[x].hora}</td>
                <td>{fechas[x].entrevistador}</td>
                <td>{fechas[x].observaciones}</td>
                <td>
                  <label>{fechas[x].estatuscita.descripcion}</label>
                </td>
              </tr>
              }
            }
          }
        }
      }
    }
    else
    {
      for(x=0;x<postulanteB.length; x++)
      {
        for(y=0; y<postulanteB[x].cita.length;y++)
        {
          if(postulanteB[x].cita[y].fecha===newfecha)
          {
            datOrden[x]=<tr name="citaPB" key={postulanteB[x].cita[y].id_cita}>
            <th>
              <input
                type="radio"
                name="seleccion"
                value={postulanteB[x].cita[y].id_cita}
                disabled={
                  postulanteB[x].cita[y].estatuscita.id_estatus_cita === 2 ||
                  postulanteB[x].cita[y].estatuscita.id_estatus_cita === 3
                }
                onClick={this.handleClick}
              />
            </th>
            <th>
              {postulanteB[x].nombre + " " + postulanteB[x].apellido1 + " " + postulanteB[x].apellido2}
            </th>
            <td>{postulanteB[x].cita[y].fecha}</td>
            <td>{postulanteB[x].cita[y].hora}</td>
            <td>{postulanteB[x].cita[y].entrevistador}</td>
            <td>{postulanteB[x].cita[y].observaciones}</td>
            <td>
              <label>{postulanteB[x].cita[y].estatuscita.descripcion}</label>
            </td>
          </tr>
          }
        }
      }
    }

    return datOrden;
  }
}

const mapStateToProps = state => {
  return {
    radiobutton: state.radiobutton,
    auth: state.auth
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
