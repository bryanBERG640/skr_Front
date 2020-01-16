//LIBRERIAS
import React, { Component } from "react";
import { connect } from "react-redux"; //Se utiliza para conectar al store.
import { Typography } from "@material-ui/core";

//RUTAS
import "../../../App.css";

class Datos extends Component {
  render() {
    //const { postulanteC } = this.state;
    const postulanteC = this.props.postulanteC;
    // console.log(postulanteC);
    // console.log(this.props.postulanteC);
    return (
      <React.Fragment>
        <div>
          <Typography>
            <b id="div">Fecha de nacimiento:</b> {postulanteC.fecha_nacimiento}
          </Typography>
          <Typography>
            <b id="div">Edad:</b> {postulanteC.edad}
          </Typography>
          <Typography>
            <b id="div">Sexo:</b> {postulanteC.sexo.descripcion}
          </Typography>
          <Typography>
            <b id="div">CURP:</b> {postulanteC.curp}
          </Typography>
          <Typography>
            <b id="div">RFC:</b> {postulanteC.rfc}
          </Typography>
          <Typography>
            <b id="div">Escuela:</b> {postulanteC.escuela.descripcion}
          </Typography>
          <Typography>
            <b id="div">Carrera:</b> {postulanteC.carrera.descripcion}
          </Typography>
          <Typography>
            <b id="div">Estatus Titulación:</b>{" "}
            {postulanteC.estatustitulacion.descripcion}
          </Typography>
          <Typography>
            <b id="div">Certificaciones:</b> {postulanteC.certificaciones}
          </Typography>
          <Typography>
            <b id="div">Pretencion Economica Mensual:</b>{" "}
            {postulanteC.pretencion_economica}
          </Typography>
          <Typography>
            <b id="div">Acuerdo Economico Mensual:</b>{" "}
            {postulanteC.acuerdo_economico}
          </Typography>
          <Typography>
            <b id="div">Estatus CV:</b> {postulanteC.estatuscv.descripcion}
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    postulante: state.postulante,
    postulanteC: state.postulantec
  };
};

export default connect(mapStateToProps, null)(Datos);
