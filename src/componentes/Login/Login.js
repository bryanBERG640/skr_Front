import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import firebase from "./Firebase";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
      });
  }

  render() {
    return (
      <div align="right">
        <Button variant="contained" onClick={this.login}>
          Iniciar Sesion
        </Button>
        {/* {login()} */}
      </div>
    );
  }
}
