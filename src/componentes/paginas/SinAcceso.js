import React from "react";
import Icono from "../../Imagenes/accesoDenegado.jpg";
import { Grid } from "@material-ui/core";

class AccesoDenegado extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <br />
          <br />
          <Grid container direction="row" justify="center" alignItems="center">
            <img src={Icono} alt="icono" />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default AccesoDenegado;
