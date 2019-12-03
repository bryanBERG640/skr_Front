import React from "react";
import { watcherUserChanges, watchUser } from "./watcher";
import { createUser, deleteUser, updateUser } from "./api";

export const AuthContext = React.createContext();

export class AuthContextProvider extends React.Component {
  state = {
    isLoggedIn: false,
    user: null
  };

  componentWillMount() {
    watcherUserChanges(user => {
      if (user) {
        this.setState({
          isLoggedIn: true,
          user
        });
      } else {
        this.setState({
          isLoggedIn: false,
          user: null
        });
      }
    });
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AuthContextConsumer = AuthContext.Consumer;
