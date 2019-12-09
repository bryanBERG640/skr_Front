import React from "react";
import { watcherUserChanges, watcherUser } from "./watcher";
// import {watchUser}from "./watcher";
// import { createUser, deleteUser, updateUser } from "./api";

export const AuthContext = React.createContext();

export class AuthContextProvider extends React.Component {
  state = {
    isLoggedIn: false,
    authReady: false,
    user: null,
    usuarios: []
  };

  componentDidMount() {
    watcherUserChanges(user => {
      if (user) {
        this.setState({
          isLoggedIn: true,
          authReady: true,
          user
        });
      } else {
        this.setState({
          isLoggedIn: false,
          authReady: true,
          user: null
        });
      }
    });

    watcherUser(usuarios => {
      this.setState({ usuarios });
    });
  }

  render() {
    //console.log(this.state.usuarios);
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AuthContextConsumer = AuthContext.Consumer;
