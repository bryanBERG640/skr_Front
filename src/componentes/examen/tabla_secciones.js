import React from "react";
import { connect } from "react-redux";
import { getSecciones, getExamenes } from "../../request/request";
import { setSeccion, changeValor } from "../../actions/postulanteB";

class TablaSeccion extends React.Component {
  state = {
    respSeccion: [],
    seccion: this.props.seccion,
    respExamen: [],
    examen: "vacio"
  };

  componentWillUpdate(previousProps, previousState) {
    if (previousProps !== this.props) {
      console.log("actualizando TablaSeccion");
      this.getSecciones();
      this.getExamenes();
    }
  }

  getSecciones = async () => {
    const nuevoGet = await getSecciones();
    this.setState({ respSeccion: nuevoGet.data });
  };

  getExamenes = async () => {
    const nuevoGet = await getExamenes();
    this.setState({ respExamen: nuevoGet.data });

    nuevoGet.data.map(exa => {
      if (exa.id_examen === this.props.examen.id_examen) {
        this.setState({ examen: exa });
      }
    });
  };

  handleClick = e => {
    const id = parseInt(e.target.value);
    //console.log(id);
    this.state.respSeccion.map(secc => {
      if (secc.id_seccion === id) {
        this.props.dispatchSetSeccion(secc);
        this.props.dispatchSeleccion("seleccionado");
      }
    });
    // this.props.dispatchSetSeccion();
  };

  render() {
    const { examen } = this.state;
    //console.log(examen);
    const secciones = this.state.respSeccion.map(secc => {
      if (examen !== "vacio") {
        return examen.seccion.map(exa => {
          if (exa.id_seccion === secc.id_seccion) {
            const i = secc.id_seccion;
            return (
              <tr key={secc.id_seccion} style={{ whiteSpace: "nowrap" }}>
                <input
                  type="radio"
                  name="seleccion"
                  value={i}
                  onClick={this.handleClick}
                />
                <td>{secc.no_seccion}</td>
                <td>{secc.puntaje}</td>
                <td>{secc.calificacion}</td>
              </tr>
            );
          }else { return false; }
        });
      }else { return false; }
    });

    return (
      <React.Fragment>
        <div className="container">
          <table class="table">
            <thead>
              <tr>
                <th width="10%">seleccion</th>
                <th scope="col">No. seccion</th>
                <th scope="col">Puntaje</th>
                <th scope="col">calificacion</th>
              </tr>
            </thead>
            <tbody>{secciones}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    examen: state.examen,
    seccion: state.seccion
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchSetSeccion: value => dispatch(setSeccion(value)),
  dispatchSeleccion: value => dispatch(changeValor(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(TablaSeccion);
