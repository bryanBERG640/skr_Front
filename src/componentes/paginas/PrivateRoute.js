import React from "react";
import { AuthContext } from "../Login/auth";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Autorizacion } from "../filtros/Autorizaciones";
import Denegado from "./SinAcceso";

class PrivateRoute extends React.Component {
  state = {
    autorizado: null
  };

  render() {
    const { isLoggedIn } = this.context;
    const { allowed, type, ...rest } = this.props;

    if (type === "private" && !isLoggedIn) return <Redirect to="/Login" />;
    else if (type === "public" && isLoggedIn) return <Redirect to="/" />;
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
        return <Redirect to="/" />;
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
        return <Redirect to="/" />;
    }
    const autorizado = Autorizacion(allowed, this.props.rol);
    //console.log("autorizado?: " + autorizado);
    if (autorizado === false) return <Denegado />;

    return <Route {...rest} />;
  }
}

PrivateRoute.contextType = AuthContext;

const mapStateToProps = state => ({
  rol: state.rol,
  postulante: state.postulante,
  postulanteC: state.postulantec
});

export default connect(mapStateToProps, null)(PrivateRoute);
