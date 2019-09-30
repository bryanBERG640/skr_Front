import React from "react";
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

export default class Citas extends React.Component {
  state = {
    resp: []
  };
  componentWillMount = () => {
    getPostulanteC(2)
      .then(response => {
        let nuevoGet = [];
        nuevoGet.push(response);
        this.setState({ resp: nuevoGet });
      })
      .catch(console.log);
  };
  render() {
    const citas = this.state.resp.map(datos => {
      return datos.postulanteb.cita.map(date => {
        return (
          //segunda parte

          <TableRow>
            <TableCell style={{ fontSize: "12px" }}>
              {datos.postulanteb.nombre}
            </TableCell>
            <TableCell style={{ fontSize: "12px" }}>
              {datos.postulanteb.apellido1}
            </TableCell>
            <TableCell style={{ fontSize: "12px" }}>
              {datos.postulanteb.apellido2}
            </TableCell>
            <TableCell style={{ fontSize: "12px" }}>{date.fecha}</TableCell>
            <TableCell style={{ fontSize: "12px" }}>{date.hora}</TableCell>
            <TableCell style={{ fontSize: "12px" }}>
              {date.entrevistador}
            </TableCell>
            <TableCell style={{ fontSize: "12px" }}>
              {date.observaciones}
            </TableCell>
            <TableCell>
              <Checkbox style={{ color: "#6D107D" }} checked />
            </TableCell>
          </TableRow>
        );
      });
    });
    return (
      <div>
        <Paper>
          <Table>
            <TableHead style={{ background: "#bbe5f7" }}>
              <TableRow>
                <TableCell align="center" style={{ fontSize: "14px" }}>
                  Nombre
                </TableCell>
                <TableCell align="center" style={{ fontSize: "14px" }}>
                  Apellido Paterno
                </TableCell>
                <TableCell align="center" style={{ fontSize: "14px" }}>
                  Apellido Materno
                </TableCell>
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
                  Observaciones
                </TableCell>
                <TableCell align="center" style={{ fontSize: "14px" }}>
                  Asistió
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
