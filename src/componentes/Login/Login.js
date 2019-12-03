import React, { Component } from "react";
import firebase from "./Firebase";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import salir from "../../Imagenes/salir.png";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { setUsuario } from "../../actions/postulanteB";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    auth: false,
    usuario: null,
    fotoUsuario: null
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ auth: true });
        this.setState({ usuario: user.displayName });
        this.setState({ fotoUsuario: user.providerData[0].photoURL });
        this.props.dispatchSetUsuario(user.email);
      } else {
        this.setState({ auth: false });
        this.setState({ usuario: null });
        this.setState({ fotoUsuario: "" });
        this.props.dispatchSetUsuario(null);
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
    this.setState({ auth: false });
    this.setState({ usuario: null });
    this.setState({ fotoUsuario: "" });
    this.props.dispatchSetUsuario(null);
  };

  render() {
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
              alignContent="right"
            >
              <AccountCircle />
            </IconButton>
          </div>
        ) : (
          ""
        )}

        {this.state.auth === true ? (
          <div className="row">
            <Avatar
              style={{ marginTop: 10 }}
              src={this.state.fotoUsuario}
              alt="foto usuario"
            />
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
                <Avatar src={salir} alt="Logo" />
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
  dispatchSetUsuario: value => dispatch(setUsuario(value))
});

export default connect(null, mapDispatchToProps)(Login);
