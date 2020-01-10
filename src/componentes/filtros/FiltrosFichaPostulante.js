import React, { Component } from "react";
import { connect } from "react-redux"; //Se utiliza para conectar al store.
import { getPostulanteTodo } from "../../request/request"; //Se import la libreria para usar la función que retorna una consulta a la base de datos para obtener postulanteC.
import { progresBar } from "../progress";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

class FiltrosFichaPostulante extends Component {
  state = {
    postulanteC: [],
    isLoading: true,
    postulanteB: this.props.postulante
  };

  //Se crea una funcón para llamar la función que ejecutra una consulta  a la base de datos.
  componentWillMount = () => {
    this.getPostulanteTodo();
    this.setState({ isLoading: false });
  };
  //Se crea una función para asignar el resultado de la consulta de la función anterior en un estado.
  getPostulanteTodo = async () => {
    const nuevoGet = await getPostulanteTodo(this.props.auth);
    this.setState({ postulanteC: nuevoGet.data });
    //console.log(this.state.postulanteC)
  };

  render() {
    progresBar(true);
    const { postulanteB } = this.state;
    return (
      <React.Fragment>
        <div>
          <Typography style={{ fontSize: "20px" }}>
            <b id="div">Perfil: </b>
            <br />
            {postulanteB.perfil.descripcion}
          </Typography>
          <Typography style={{ fontSize: "20px" }}>
            {postulanteB.nombre} {postulanteB.apellido1} {postulanteB.apellido2}
          </Typography>
          <Divider />
          <Typography style={{ fontSize: "12px", color: "#a2bd31" }}>
            {postulanteB.correo}
          </Typography>
          <Typography style={{ fontSize: "12px", color: "#a2bd31" }}>
            <b>Telefono: </b>
            {postulanteB.telefono}
          </Typography>
          <Typography style={{ fontSize: "12px", color: "#a2bd31" }}>
            <b>Celular: </b>
            {postulanteB.celular}
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    postulante: state.postulante,
    auth: state.auth
  };
};

export default connect(mapStateToProps, null)(FiltrosFichaPostulante);
