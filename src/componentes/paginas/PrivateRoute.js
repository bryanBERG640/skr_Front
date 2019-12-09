import React from "react";
import { AuthContext } from "../Login/auth";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Autorizacion } from "../filtros/Autorizaciones";

class PrivateRoute extends React.Component {
  state = {
    autorizado: null
  };

  // componentDidMount() {
  //   this.Autorizacion();
  // }

  // Autorizacion = async () => {
  //   const autorizado = await Autorizacion(this.props.allowed, this.props.rol);
  //   console.log("autorizado?: " + autorizado);
  //   this.setState({ autorizado });
  // };

  render() {
    const { isLoggedIn } = this.context;
    const { allowed, type, ...rest } = this.props;

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
    const autorizado = Autorizacion(allowed, this.props.rol);
    console.log("autorizado?: " + autorizado);
    if (autorizado === false) return <h1>Lo siento, no tienes acceso</h1>;

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
