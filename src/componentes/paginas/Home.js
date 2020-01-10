import React from "react";
import Postulantes from "../../Imagenes/postulantes.png";
import Agenda from "../../Imagenes/agenda.png";
import agregar from "../../Imagenes/agregar-postulante.png";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../styles/FormatoImagenes.css";

export default class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <br />
        <br />
        <div style={{ padding: 20 }}>
          <Grid
            container
            spacing={4}
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Link to="/consultar-Postulantes">
                <img
                  className="postulantesHome"
                  src={Postulantes}
                  alt="postulantes"
                />
              </Link>
              <h2>Consultar Postulantes</h2>
            </Grid>
            <Grid item>
              <Link to="/consultarCita">
                <img className="AgendarHome" src={Agenda} alt="agenda" />
              </Link>
              <h2>Consultar Citas</h2>
            </Grid>
            <Grid item>
              <Link to="/agregar_PB">
                <img className="AgregarHome" src={agregar} alt="agregar" />
              </Link>
              <h2>Agregar Postulante</h2>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
