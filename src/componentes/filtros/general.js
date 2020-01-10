import React from "react";
import { connect } from "react-redux";
import Loading from "../paginas/Loading";

class Verificacion extends React.Component {
  state = {
    isLoading: true,
    check: false
  };

  verificacion() {
    if (
      this.props.usuario !== null &&
      this.props.rol !== null &&
      this.props.auth !== null
    )
      this.setState({ isLoading: false, check: true });
  }

  render() {
    if (this.state.check === false) this.verificacion();
    if (this.state.isLoading === true) {
      return <Loading />;
    }
    return this.props;
  }
}

const mapStateToProps = state => ({
  usuario: state.usuario,
  rol: state.rol,
  auth: state.auth
});

export default connect(mapStateToProps, null)(Verificacion);
