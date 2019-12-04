import React from "react";
import { AuthContext } from "../Login/auth";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRoute extends React.Component {
  render() {
    const { isLoggedIn } = this.context;
    const { type, ...rest } = this.props;

    if (type === "private" && !isLoggedIn) return <Redirect to="/Login" />;
    else if (type === "public" && isLoggedIn)
      return <Redirect to="/consultar-Postulantes" />;
    else if (type === "privateB") {
      if (
        (!isLoggedIn && this.props.postulante === "vacio") ||
        this.props.postulante === undefined
      )
        return <Redirect to="/Login" />;
      else if (
        (!isLoggedIn && this.props.postulante !== "vacio") ||
        this.props.postulante === undefined
      )
        return <Redirect to="/Login" />;
      else if (
        (isLoggedIn && this.props.postulante === "vacio") ||
        this.props.postulante === undefined
      )
        return <Redirect to="/consultar-Postulantes" />;
    } else if (type === "privateC") {
      if (
        (!isLoggedIn && this.props.postulanteC === "vacio") ||
        this.props.postulanteC === undefined
      )
        return <Redirect to="/Login" />;
      else if (
        (!isLoggedIn && this.props.postulanteC !== "vacio") ||
        this.props.postulanteC === undefined
      )
        return <Redirect to="/Login" />;
      else if (
        (isLoggedIn && this.props.postulanteC === "vacio") ||
        this.props.postulanteC === undefined
      )
        return <Redirect to="/consultarCita" />;
    }

    return <Route {...rest} />;
  }
}

PrivateRoute.contextType = AuthContext;

const mapStateToProps = state => ({
  postulante: state.postulante,
  postulanteC: state.postulantec
});

export default connect(mapStateToProps, null)(PrivateRoute);
