import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import logo from "../Imagenes/logo.png";
import "./styles/NavBarLogo.css";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Login from "./Login/Login";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

class MenuAppBar extends React.Component {

  state = {
    left: false,
    usuario: null,
    auth: false,
    anchoEl: null,
    fotoUsuario: null
  };

  handleMenu = e => {
    this.setState({ anchoEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchoEl: null });
  };

  toggleDrawer = (side, open) => e => {
    if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }

    this.setState({ [side]: open });
  };

  render() {
    const sideList = side => (
      <div
        role="presentation"
        onClick={this.toggleDrawer(side, false)}
        onKeyDown={this.toggleDrawer(side, false)}
      >
        {this.props.usuario !== null ? (
          <div>
            <List>
              {[
                "Solicitud de Requerimiento",
                "Definicion de Perfil",
                "Reclutamiento y Selección"
              ].map((text, index) => (
                <ListItem button key={text} disabled>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <Link
              to="/consultar-Postulantes"
              className="btn btn-default"
              width="200px"
            >
              Postulantes
            </Link>
            <br />
            <Link to="/consultarCita" className="btn btn-default">
              Citas
            </Link>
            <Divider />
            <List>
              {["Comparativo", "Metricas", "Riesgos"].map((text, index) => (
                <ListItem button key={text} disabled>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        ) : (
          ""
        )}
        {this.props.usuario === null ? (
          <div align="center">
            <List>
              {["    ", "   ", "     ", "     "].map(
                (text, index) => (
                  <ListItem button key={text} disabled>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              )}
            </List>
            <Link to="/Login" className="btn btn-default"
              width="200px">Debes Iniciar Sesion</Link>
            <Divider />
          </div>
        ) : (
          ""
        )}
      </div>
    );
    return (
      <React.Fragment>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Grid item xs={6}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    style={{ width: 64 }}
                    onClick={this.toggleDrawer("left", true)}
                  >
                    <div className="item">
                      <MenuIcon />
                    </div>
                  </IconButton>
                  <Typography variant="h6" noWrap>
                    <a className="Navbar__brand" href="/">
                      <img className="Navbar_logo" src={logo} alt="Logo" />
                    </a>
                  </Typography>

                  <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer("left", false)}
                    onOpen={this.toggleDrawer("left", true)}
                  >
                    {sideList("left")}
                  </SwipeableDrawer>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="flex-start"
                >
                  <Login />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  usuario: state.usuario
});

export default connect(mapStateToProps, null)(MenuAppBar);
