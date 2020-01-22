import React, { Component } from "react";
import firebase from "./Firebase";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
//import salir from "../../Imagenes/salir.png";
import cerrar from "../../Imagenes/cerrar_sesion.webp"
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { setUsuario, setRol, setAuth } from "../../actions/postulanteB";
import { watcherUser } from "../Login/watcher";
import { postLogin } from "../../request/request";


class Login extends Component {
  state = {
    auth: false,
    usuario: null,
    fotoUsuario: null,
    usuarios: []
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.dispatchSetUsuario(user);

        this.setState({ auth: true });
        this.setState({ usuario: user.displayName });
        this.setState({ fotoUsuario: user.providerData[0].photoURL });
        watcherUser(usuarios => {
          this.setState({ usuarios });
        });
      } else {
        this.setState({ auth: false });
        this.setState({ usuario: null });
        this.setState({ fotoUsuario: "" });
        this.props.dispatchSetUsuario(null);
        this.props.dispatchSetRol(null);
      }
    });
  }

  verificacion = () => {
    //console.log("verificando...");
    // watcherUser(usuarios => {
    //   this.setState({ usuarios });
    // });

    this.state.usuarios.map(us => {
      //console.log(us);

      if (us.correo === this.props.usuario.email) {
        

        this.props.dispatchSetRol(us.rol);

        postLogin(us.nombre, us.correo)
          .then(response => {
            this.props.dispatchSetAuth(response.headers.authorization);
          })
          .catch(console.log);
        this.setState({ isLoading: false });
      }
      return us;
    });
  };

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
    this.setState({ auth: false });
    this.setState({ usuario: null });
    this.setState({ fotoUsuario: "" });
    this.props.dispatchSetUsuario(null);
    this.props.dispatchSetRol(null);
  };

  render() {
    //console.log(this.state.usuarios);
    if (this.props.usuario !== null) {
      if (this.state.usuarios.length === 0) {
        //console.log("usuarios vacios");
        this.verificacion();
      } else {
        //console.log("usuarios encontrados");
        if (this.props.rol === null) {
          this.verificacion();
        }
      }
    }
    return (
      <div>
        {this.state.auth === false ? (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.login}
              color="inherit"
              //alignContent="right"
            >
              <AccountCircle />
            </IconButton>
          </div>
        ) : (
          ""
        )}

        {this.state.auth === true ? (
          <div className="row">
            {this.props.rol === "Admin" || this.props.rol === "SuperAdmin" ? (
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <Link to="/Admin/Usuarios">
                  <Avatar
                    //style={{ marginTop: 10 }}
                    src={this.state.fotoUsuario}
                    alt="foto usuario"
                  />
                </Link>
              </IconButton>
            ) : (
              <Avatar
                style={{ marginTop: 10 }}
                src={this.state.fotoUsuario}
                alt="foto usuario"
              />
            )}

            <Typography variant="h6">
              <label style={{ paddingTop: 12, paddingLeft: 6 }}>
                {"  " + this.state.usuario + "  "}
              </label>
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <Link to="/Login" onClick={this.logOut}>
                <Avatar src={cerrar} alt="Logo" />
              </Link>
            </IconButton>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchSetUsuario: value => dispatch(setUsuario(value)),
  dispatchSetRol: value => dispatch(setRol(value)),
  dispatchSetAuth: value => dispatch(setAuth(value))
});

const mapStateToProps = state => ({
  usuario: state.usuario,
  rol: state.rol
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
