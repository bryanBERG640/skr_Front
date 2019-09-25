import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../Imagenes/logo.png";
import "./styles/NavBarLogo.css";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250
  }
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {["Solicitud de Requerimiento","Definicion de Perfil","Reclutamiento y Selección"].map((text, index) => (
          <ListItem button key={text} disabled>
            <ListItemText primary={text} />
          </ListItem>
           ))
        }
      </List>
      <Divider />
      <Link to="/consultar-Postulantes" className="btn btn-default">
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
            <ListItemText primary={text}/>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar className="bar" position="static">
        <IconButton
          style={{ alignContent: "left" }}
          onClick={toggleDrawer("left", true)}
          color="inherit"
        >
          <div className="item">
            <MenuIcon />
          </div>
          <Typography variant="h6" color="inherit" noWrap>
            <a className="Navbar__brand" href="/">
              <img className="Navbar_logo" src={logo} alt="Logo" />
            </a>
          </Typography>
        </IconButton>

        <SwipeableDrawer
          open={state.left}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {sideList("left")}
        </SwipeableDrawer>
      </AppBar>
    </div>
  );
}
