//LIBRERIAS
import React from "react";
import { connect } from "react-redux";import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Container, Grid } from "@material-ui/core";

//RUTAS
import Ficha from "./Ficha";
import IconoExamen from "../../../Imagenes/avatar.png";
import "../../../App.css";
import { progresBar } from "../../progress";
import FiltrosFichaPostulante from "../../filtros/FiltrosFichaPostulante";


const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
      width: 400
    }}
  />
);

class FichaPostulante extends React.Component {
  state = {
    postB: this.props.postulanteB
  };
  render() {
    progresBar(true);
    const Foto = this.props.postulanteC.foto_perfil;
    return (
      <div>
        <br />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <ColoredLine color="black" />
          </Grid>
          <Grid item>
            <FiltrosFichaPostulante />
          </Grid>
          <Grid item>
            <ColoredLine color="black" />
          </Grid>
        </Grid>
        <tr>
          <td>
            <Container>
              <tr>
                {Foto === null ? (
                  <img
                    className="agciAvatar"
                    src={IconoExamen}
                    alt="Foto Postulante"
                    style={{ marginTop: 0 }}
                  />
                ) : (
                  ""
                )}

                {Foto !== null ? (
                  <img
                    className="agciAvatar"
                    src={Foto}
                    alt="Foto de Postulante"
                    style={{ marginTop: 0, width: 160, height: 160 }}
                  />
                ) : (
                  ""
                )}
              </tr>
              <tr>
                <TextField
                  disabled
                  label="Estatus"
                  value={this.state.postB.estatuspostulante.descripcion}
                  margin="normal"
                  variant="outlined"
                  style={{ backgroundColor: "#fae0ff" }}
                />
              </tr>
              <tr align="center">
                <Link to="/consultar-Postulantes" className="btn btn-primary">
                  Salir
                </Link>
              </tr>
            </Container>
          </td>
          <td>
            <Container>
              <Ficha />
            </Container>
          </td>
        </tr>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    postulanteB: state.postulante,
    postulanteC: state.postulantec
  };
};

export default connect(mapStateToProps, null)(FichaPostulante);
