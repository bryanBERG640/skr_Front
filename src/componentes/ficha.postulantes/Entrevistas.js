import React from "react";
import {
  TableHead,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Paper
} from "@material-ui/core";
import { getEntrevista } from "../../request/request";
import { connect } from "react-redux";

class Entrevistas extends React.Component {
  state = {
    resp: [],
    postC: this.props.postulantec.postulanteb.cita
  };
  componentWillMount = () => {
    this.getEntrevista();
  };

  getEntrevista = async () => {
    const nuevoGet = await getEntrevista();
    this.setState({ resp: nuevoGet.data });
  };

  render() {
    const { resp, postC } = this.state;
    const entrevistas = postC.map(cit => {
      return cit.entrevista.map(entr => {
        return resp.map(e => {
          if (entr.id_entrevista === e.id_entrevista) {
            return (
              <TableRow>
                <TableCell style={{ fontSize: "12px" }}>
                  {e.tipoentrevista.descripcion}
                </TableCell>
                <TableCell style={{ fontSize: "12px" }}>
                  {e.entrevistador}
                </TableCell>
                <TableCell style={{ fontSize: "12px" }}>
                  {cit.empresa.descripcion}
                </TableCell>
                <TableCell style={{ fontSize: "12px" }}>
                  {cit.cliente.descripcion}
                </TableCell>
                <TableCell style={{ fontSize: "12px" }}></TableCell>
                <TableCell style={{ fontSize: "12px" }}>
                  {e.observaciones}
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
)(Entrevistas);
