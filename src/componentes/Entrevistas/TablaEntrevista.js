import React, { Component } from "react";
import "../styles/Formatos.css";
import { getEntrevista, getCitaId } from "../../request/request";
import { connect } from "react-redux";

class TablaEntrevista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entre: [],
      citas: this.props.cita
    };
  }
  componentWillUpdate(previousProps, previousState) {
    if (previousProps !== this.props) {
      this.getEntrevistas();
      this.getCitaId();
    }
  }

  getCitaId = async () => {
    const nuevoGet = await getCitaId(this.props.cita.id_cita);
    this.setState({ citas: nuevoGet.data });
  };

  getEntrevistas = async () => {
    const nuevoGet = await getEntrevista();
    this.setState({ entre: nuevoGet.data });
  };

  render() {
    //console.log(this.state.citas)
    const { citas, entre } = this.state;
    const entrevistas = citas.entrevista.map(cit => {
      return entre.map(entrevistas => {
        if (entrevistas.id_entrevista === cit.id_entrevista) {
          //console.log("Encontrado")
          return (
            <tr>
              <td>{entrevistas.tipoentrevista.descripcion}</td>
              <td>{entrevistas.entrevistador}</td>
              <td>{entrevistas.observaciones}</td>
            </tr>
          );
        } else {
          return false;
        }
      });
    });
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <table className="table table_hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Tipo de entrevista</th>
                    <th scope="col">Entrevistador</th>
                    <th scope="col">Observaciones</th>
                  </tr>
                </thead>
                <tbody>{entrevistas}</tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cita: state.cita,
    entrevista: state.entrevista
  };
};

export default connect(mapStateToProps, null)(TablaEntrevista);
