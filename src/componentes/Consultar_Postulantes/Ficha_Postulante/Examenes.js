//RUTAS
import React from "react";
import { connect } from "react-redux";
import { TableHead, TableBody, Table, TableRow, TableCell, Paper } from "@material-ui/core";


class Citas extends React.Component {
  state = {
    postC: this.props.postulante.cita
  };

  render() {
    const { postC } = this.state;

    const examenes = postC.map(cit => {
      if (cit.examen.length !== 0) {
        return cit.examen.map(exa => {
          return (
            <TableRow>
              <TableCell style={{ fontSize: "12px" }}>
                {exa.tipoexamen.examen_tipo}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {exa.tipoexamen.descripcion}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {exa.calificacion_global}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {cit.empresa.descripcion}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {cit.cliente.descripcion}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {exa.entrevistador}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {exa.observaciones}
              </TableCell>
            </TableRow>
          );
        });
      } else return null;
    });

    var vacio;
    if (examenes.length === 0) vacio = "No hay Examenes";
    else {
      var i = 0;
      var c = 0;
      for (i = 0; i < examenes.length; i++) {
        if (examenes[i] === null) {
          c++;
        }
      }
      if (examenes.length === c) vacio = "No hay Examenes";
    }

    return (
      <div>
        <Paper>
          <Table>
            <TableHead style={{ background: "#b4e5f7" }}>
              <TableCell>Tipo de Examen</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Calificación Global</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Entrevistador</TableCell>
              <TableCell>Observaciones</TableCell>
            </TableHead>
            <TableBody>{examenes}</TableBody>
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
    postulante: state.postulante
  };
};

export default connect(mapStateToProps, null)(Citas);
