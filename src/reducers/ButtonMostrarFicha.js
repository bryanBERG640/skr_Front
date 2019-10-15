import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class ButtonMostrarFicha extends Component {

    getInitialState() {
        return {email: ''}
      }

    handlehange = e => {
        console.log("Funciona handlechange  -.-.-.-.-.-----")
        this.setState({email: e.target.value})
    }

    render() {
        console.log("Desde ButtonMostrarFicha - detectando accion:" + this.props.postulantec)
        return (
            <div>
                <button disabled={this.handlehange}>
                    <Link to="/Ficha-Postulante" className="btn btn-primary" onClick={this.handleClickMostrarFicha}>
                        Mostrar Ficha
                    </Link>
                </button>
            </div>
        );
    }
}

const mapStateProps = state => {
    return {
        postulantec: state.postulantec
    };
};

export default connect(mapStateProps, null)(ButtonMostrarFicha);