import React from "react";
import { connect } from "react-redux";
import { setUsuario } from "../../actions/postulanteB";
import { Container, Grid, Button } from "@material-ui/core";
// import { Avatar } from "@material-ui/core";
import Typography from "@material-ui/core/typography";
import firebase from "./Firebase";
import "../styles/Login.css";
import Avatar from "../../Imagenes/avatar.png";

class LoginView extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    auth: false,
    usuario: null,
    correo:null,
    fotoUsuario: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ auth: true });
        this.setState({ usuario: user.displayName });
        this.setState({ fotoUsuario: user.providerData[0].photoURL });
        this.setState({correo:user.email})
        this.props.dispatchSetUsuario(user.email);
      } else {
        this.setState({ auth: false });
        this.setState({ usuario: null });
        this.setState({ fotoUsuario: "" });
        this.setState({correo:null})
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
  };

  render() {
    return (
      <React.Fragment>
        {this.state.auth === false ? (
          <div className="container" style={{ marginTop: 150 }}>
            <div className="d-flex justify-content-center h-100">
              <div className="user_card">
                <div className="d-flex justify-content-center">
                  <div className="brand_logo_container">
                    <img src={Avatar} className="brand_logo" alt="Logo" />
                  </div>
                </div>
                <div className="d-flex justify-content-center form_container">
                  <form>
                    <div className="input-group mb-3">
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fas fa-user"></i>
                        </span>
                      </div>
                      <label className="form-control input_user">Nombre</label>
                    </div>
                    <div className="input-group mb-2">
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fas fa-key"></i>
                        </span>
                      </div>
                      <label className="form-control input_pass">Correo</label>
                    </div>
                    <div className="d-flex justify-content-center mt-3 login_container">
                      <button
                        type="button"
                        name="button"
                        className="btn login_btn"
                        onClick={this.login}
                      >
                        Iniciar Sesion
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.auth === true ? (
          <div className="container" style={{ marginTop: 150 }}>
          <div className="d-flex justify-content-center h-100">
            <div className="user_card">
              <div className="d-flex justify-content-center">
                <div className="brand_logo_container">
                  <img src={this.state.fotoUsuario} className="brand_logo" alt="Logo" />
                </div>
              </div>
              <div className="d-flex justify-content-center form_container">
                <form>
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
        <label className="form-control input_user">{" "+this.state.usuario}</label>
                  </div>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-key"></i>
                      </span>
                    </div>
                    <label className="form-control input_pass">{" "+this.state.correo}</label>
                  </div>
                  <div className="d-flex justify-content-center mt-3 login_container">
                    <button
                      type="button"
                      name="button"
                      className="btn login_btn"
                      onClick={this.logOut}
                    >
                      Cerrar Sesion
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchSetUsuario: value => dispatch(setUsuario(value))
});

export default connect(null, mapDispatchToProps)(LoginView);
