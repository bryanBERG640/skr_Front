//LIBRERIAS
import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { TableHead, TableBody, Table, TableCell, TableRow } from "@material-ui/core";

//RUTAS
import { getPostulanteBId } from "../../../request/request";



class Citas extends Component {
  state = {
    postB: [],
    isLoading: true
  };
  componentWillMount = () => {
    this.getPostulanteB(this.props.postulante.id_postulante_b);
  };

  getPostulanteB = async idPostulante => {
    const nuevoGet = await getPostulanteBId(idPostulante, this.props.auth);
    this.setState({ postB: nuevoGet.data });
  };

  render() {
    // console.log(this.state.resp);
    // console.log(this.state.postB);
    const postulante = this.props.postulante;
    const citas = postulante.cita.map(c => {
      return (
        <TableRow>
          <TableCell>{c.fecha}</TableCell>
          <TableCell>{c.hora}</TableCell>
          <TableCell>{c.entrevistador}</TableCell>
          <TableCell>{c.cliente.descripcion}</TableCell>
          <TableCell>{c.empresa.descripcion}</TableCell>
          <TableCell>{c.observaciones}</TableCell>
          <TableCell>{c.estatuscita.descripcion}</TableCell>
        </TableRow>
      );
    });
    //console.log(citas);
    var vacio;
    if (citas.length === 0) vacio = "No hay Citas";
    return (
      <div>
        <Paper>
          <Table>
            <TableHead style={{ background: "#bbe5f7" }}>
              <TableRow>
                <TableCell align="center" style={{ fontSize: "14px" }}>
                  Fecha
                </TableCell>
                <TableCell align="center" style={{ fontSize: "14px" }}>
                  Hora
                </TableCell>
                <TableCell align="center" style={{ fontSize: "14px" }}>
                  Entrevistador
                </TableCell>
                <TableCell align="center" style={{ fontSize: "14px" }}>
                  Cliente
                </TableCell>
                <TableCell align="center" style={{ fontSize: "14px" }}>
                  Empresa
                </TableCell>
                <TableCell align="center" style={{ fontSize: "14px" }}>
                  Observaciones
                </TableCell>
                <TableCell align="center" style={{ fontSize: "14px" }}>
                  Estatus
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{citas}</TableBody>
          </Table>
          <h1>{vacio}</h1>
        </Paper>
      </div>
    );
  }
}

//Se accede al storo de postlantec.
const mapStateToProps = state => {
  return {
    postulante: state.postulante,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(Citas);
