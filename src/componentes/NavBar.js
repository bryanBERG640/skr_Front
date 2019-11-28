import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import logo from "../Imagenes/logo.png";
import "./styles/NavBarLogo.css";
import firebase from "./Login/Firebase";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

class MenuAppBar extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    left: false,
    usuario: null,
    auth: false,
    anchoEl: null,
    fotoUsuario: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ auth: true });
        this.setState({ usuario: user.displayName });
        this.setState({ fotoUsuario: user.providerData[0].photoURL });
      } else {
        this.setState({ auth: false });
        this.setState({ usuario: null });
        this.setState({ fotoUsuario: "" });
      }
    });
  }

  login = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.setState({ auth: true });
        this.setState({ usuario: result.user.displayName });
        console.log(result);
        // console.log(result.user.displayName)
      });
  };

  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(console.log);
    this.props.history.push("/");
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
    const open = Boolean(this.state.anchoEl);
    const classes = useStyles;
    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.toggleDrawer(side, false)}
        onKeyDown={this.toggleDrawer(side, false)}
      >
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
    );
    return (
      <React.Fragment>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={this.toggleDrawer("left", true)}
              >
                <div className="item">
                  <MenuIcon />
                </div>
              </IconButton>
              <Typography variant="h6" className={classes.title} noWrap>
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

              {this.state.auth === false ? (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.login}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </div>
              ) : (
                ""
              )}

              {this.state.auth === true ? (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <Avatar src={this.state.fotoUsuario} alt="foto usuario" />
                    <label>{"  " + this.state.usuario}</label>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.logOut}>Cerrar sesion</MenuItem>
                  </Menu>
                </div>
              ) : (
                ""
              )}
            </Toolbar>
          </AppBar>
        </div>
      </React.Fragment>
    );
  }
}

export default MenuAppBar;
