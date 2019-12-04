import React from "react";
import {
  TableHead,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Paper
} from "@material-ui/core";
import { connect } from "react-redux";

class Entrevistas extends React.Component {
  state = {
    postC: this.props.postulantec.postulanteb.cita
  };

  render() {
    const { postC } = this.state;
    const entrevistas = postC.map(cit => {
      //console.log(cit.entrevista);
      if (cit.entrevista.length !== 0) {
        return cit.entrevista.map(entr => {
          return (
            <TableRow>
              <TableCell style={{ fontSize: "12px" }}>
                {entr.tipoentrevista.descripcion}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {entr.entrevistador}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {cit.empresa.descripcion}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {cit.cliente.descripcion}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}></TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {entr.observaciones}
              </TableCell>
            </TableRow>
          );
        });
      } else return null;
    });
    //console.log(entrevistas);
    var vacio;
    if (entrevistas.length === 0) vacio = "No hay Entrevistas";
    else {
      var i = 0;
      var c = 0;
      for (i = 0; i < entrevistas.length; i++) {
        if (entrevistas[i] === null) {
          c++;
        }
      }
      if (entrevistas.length === c) vacio = "No hay Entrevistas";
    }

    return (
      <div>
        <Paper>
          <Table>
            <TableHead style={{ background: "#b4e5f7" }}>
              <TableCell style={{ fontSize: "14px" }}>
                Tipo de Entrevista
              </TableCell>
              <TableCell style={{ fontSize: "14px" }}>Fecha</TableCell>
              <TableCell style={{ fontSize: "14px" }}>Hora</TableCell>
              <TableCell style={{ fontSize: "14px" }}>Entrevistador</TableCell>
              <TableCell style={{ fontSize: "14px" }}>Cliente</TableCell>
              <TableCell style={{ fontSize: "14px" }}>Empresa</TableCell>
              <TableCell style={{ fontSize: "14px" }}>Observaciones</TableCell>
            </TableHead>
            <TableBody>{entrevistas}</TableBody>
          </Table>
          <h1>{vacio}</h1>
        </Paper>
      </div>
    );
  }
}

//Se accede al store postulantec.
const mapStateToProps = state => {
  return {
    postulantec: state.postulantec
  };
};

export default connect(mapStateToProps, null)(Entrevistas);
