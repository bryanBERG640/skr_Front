import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { getPostulanteTodo } from "../../request/request";
import "../../App.css";
import { connect } from "react-redux"; //Se utiliza para conectar al store.

class Datos extends Component {
  state = {
    postulanteC: [],
    isLoading: true,
    postulanteB: this.props.postulante
  };

  componentWillMount = () => {
    this.getPostulanteTodo();
    this.setState({ isLoading: false });
  };
  getPostulanteTodo = async () => {
    const nuevoGet = await getPostulanteTodo();
    this.setState({ postulanteC: nuevoGet.data });
  };
  render() {
    const { postulanteC } = this.state;

    const dato = postulanteC.map(postulante => {
      if (
        postulante.postulanteb.id_postulante_b ===
        this.state.postulanteB.id_postulante_b
      ) {
        return (
          <div>
            <Typography>
              <b id="div">Fecha de nacimiento:</b> {postulante.fecha_nacimiento}
            </Typography>
            <Typography>
              <b id="div">Edad:</b> {postulante.edad}
            </Typography>
            <Typography>
              <b id="div">Sexo:</b> {postulante.sexo.descripcion}
            </Typography>
            <Typography>
              <b id="div">CURP:</b> {postulante.curp}
            </Typography>
            <Typography>
              <b id="div">RFC:</b> {postulante.rfc}
            </Typography>
            <Typography>
              <b id="div">Escuela:</b> {postulante.escuela.descripcion}
            </Typography>
            <Typography>
              <b id="div">Carrera:</b> {postulante.carrera.descripcion}
            </Typography>
            <Typography>
              <b id="div">Estatus Titulación:</b>{" "}
              {postulante.estatustitulacion.descripcion}
            </Typography>
            <Typography>
              <b id="div">Certificaciones:</b> {postulante.certificaciones}
            </Typography>
            <Typography>
              <b id="div">Pretencion Economica Mensual:</b>{" "}
              {postulante.pretencion_economica}
            </Typography>
            <Typography>
              <b id="div">Acuerdo Economico Mensual:</b>{" "}
              {postulante.acuerdo_economico}
            </Typography>
            <Typography>
              <b id="div">Estatus CV:</b> {postulante.estatuscv.descripcion}
            </Typography>
          </div>
        );
      }else {
        return false;
      }
    });
    return <div>{dato}</div>;
  }
}

const mapStateToProps = state => {
  return {
    postulante: state.postulante
  };
};

export default connect(
  mapStateToProps,
  null
)(Datos);
