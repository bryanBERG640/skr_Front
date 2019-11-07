import React, { Component } from "react";
import {
  TableHead,
  TableBody,
  Table,
  TableCell,
  TableRow
} from "@material-ui/core";
import { getPostulanteB } from "../../request/request";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

class Citas extends Component {
  state = {
    resp: this.props.postulantec,
    postB: []
  };
  componentWillMount = () => {
    this.getPostulanteB();
  };

  getPostulanteB = async () => {
    const nuevoGet = await getPostulanteB();
    this.setState({ postB: nuevoGet.data });
  };

  render() {
    console.log(this.state.resp);
    console.log(this.state.postB);
    const citas = this.state.postB.map(cit => {
      if (this.state.resp.postulanteb.id_postulante_b === cit.id_postulante_b) {
        return cit.cita.map(c => {
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
      }else {
        return false
      }
    });

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
        </Paper>
      </div>
    );
  }
}

//Se accede al storo de postlantec.
const mapStateToProps = state => {
  return {
    postulantec: state.postulantec
  };
};

export default connect(
  mapStateToProps,
  null
)(Citas);
