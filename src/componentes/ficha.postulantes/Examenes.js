import React from "react";
import {
  TableHead,
  TableBody,
  Table,
  TableRow,
  TableCell,
  Paper
} from "@material-ui/core";
import { getExamenes } from "../../request/request";
import { connect } from "react-redux";

class Citas extends React.Component {
  state = {
    resp: [],
    postC: this.props.postulantec.postulanteb.cita
  };
  componentWillMount = () => {
    this.getExamenes();
  };

  getExamenes = async () => {
    const nuevoGet = await getExamenes();
    this.setState({ resp: nuevoGet.data });
  };

  render() {
    const { resp, postC } = this.state;

    const examenes = postC.map(cit => {
      return cit.examen.map(exa => {
        return resp.map(ex => {
          if (exa.id_examen === ex.id_examen) {
            // console.log(ex.tipoexamen.examen_tipo);
            return (
              <TableRow>
                <TableCell style={{ fontSize: "12px" }}>
                  {ex.tipoexamen.examen_tipo}
                </TableCell>
                <TableCell style={{ fontSize: "12px" }}>
                  {ex.tipoexamen.descripcion}
                </TableCell>
                <TableCell style={{ fontSize: "12px" }}>
                  {ex.calificacion_global}
                </TableCell>
                <TableCell style={{ fontSize: "12px" }}>
                  {cit.empresa.descripcion}
                </TableCell>
                <TableCell style={{ fontSize: "12px" }}>
                  {cit.cliente.descripcion}
                </TableCell>
                <TableCell style={{ fontSize: "12px" }}>
                  {ex.observaciones}
                </TableCell>
              </TableRow>
            );
          }
        });
      });
    });

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

export default connect(
  mapStateToProps,
  null
)(Citas);
