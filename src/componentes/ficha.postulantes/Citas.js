import React, { Component } from "react";
import {
  TableHead,
  TableBody,
  Table,
  TableCell,
  TableRow
} from "@material-ui/core";
import { getPostulanteC } from "../../request/request";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

class Citas extends Component {
  state = {
    resp: this.props.postulantec
  };
  /*componentWillMount = () => {
    getPostulanteC(this.props.postulantec.id_postulante_c)
      .then(response => {
        let nuevoGet = [];
        nuevoGet.push(response);
        this.setState({ resp: nuevoGet });
      })
      .catch(console.log);
  };*/

  render() {
    console.log(this.state.resp.curp);
    // const citas = this.state.resp.map(datos => {
    //   return datos.postulanteb.cita.map(date => {
    //     return date.seccion.map(entre => {
    //       return (
    //         //segunda parte

    //         <TableRow>
    //           <TableCell style={{ fontSize: "12px" }}>
    //             {datos.postulanteb.nombre}
    //           </TableCell>
    //           <TableCell style={{ fontSize: "12px" }}>
    //             {datos.postulanteb.apellido1}
    //           </TableCell>
    //           <TableCell style={{ fontSize: "12px" }}>
    //             {datos.postulanteb.apellido2}
    //           </TableCell>
    //           <TableCell style={{ fontSize: "12px" }}>{date.fecha}</TableCell>
    //           <TableCell style={{ fontSize: "12px" }}>{date.hora}</TableCell>
    //           <TableCell style={{ fontSize: "12px" }}>
    //             {date.entrevistador}
    //           </TableCell>
    //           <TableCell style={{ fontSize: "12px" }}>
    //             {entre.cliente.descripcion}
    //           </TableCell>
    //           <TableCell style={{ fontSize: "12px" }}></TableCell>
    //           <TableCell style={{ fontSize: "12px" }}>
    //             {date.observaciones}
    //           </TableCell>
    //           <TableCell>
    //             <Checkbox style={{ color: "#6D107D" }} checked />
    //           </TableCell>
    //         </TableRow>
    //       );
    //     });
    //   });
    // });
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
              <br />
            </TableHead>
            <TableRow>
              <TableCell style={{ fontSize: "12px" }}>
                {this.state.resp.postulanteb.cita.fecha}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {this.state.resp.postulanteb.cita.hora}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {this.state.resp.postulanteb.cita.entrevistador}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {/* {this.state.resp.postulanteb.cita.cliente.descripcion} */}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}></TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {/* {this.state.resp.postulanteb.cita.empresa.descripcion} */}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {this.state.resp.postulanteb.cita.observaciones}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {/* {this.state.resp.postulanteb.cita.estatuscita.descripcion} */}
              </TableCell>
            </TableRow>
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
