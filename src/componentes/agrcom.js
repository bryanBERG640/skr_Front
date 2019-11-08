import React from "react";
import IconAge from "../Imagenes/agenda.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { putCita } from "../request/request";
import { number } from "prop-types";
import { ValidatorForm } from 'react-material-ui-form-validator';


const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: 490
        }}
    />
);

const ColoredLine2 = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: 400
        }}
    />
);

const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();
const date = anio + "-" + mes + "-" + dia;

class agrcom extends React.Component {
    state = {
        cita: {
            id_cita: this.props.cita.id_cita,
            entrevistador: this.props.cita.entrevistador,
            fecha: this.props.cita.fecha,
            hora: this.props.cita.hora,
            observaciones: "",
            usuario_actualiza: this.props.cita.usuario_actualiza,
            fecha_actualizacion: this.props.fecha_actualizacion,
            idEstatusCita: number
        },
        radioButonPulsado: null
    };

    handleSelect = e => {
        console.log(e.target.name)
        let iec = parseInt(e.target.value);
        let cit = this.state.cita;
        cit.idEstatusCita = iec;
        cit.fecha_actualizacion = date;
        this.setState({ cita: cit, radioButonPulsado: cit.idEstatusCita });
    };

    handleChange = e => {
        let cit = this.state.cita;
        cit.observaciones = e.target.value;
        this.setState({ cita: cit });
    };

    handleClick = e => {
        console.log("Valor" + this.state.cita.idEstatusCita)
        if (this.state.radioButonPulsado !== null) {
            console.log("Dentro del if en handleClick")
            putCita(
                this.state.cita,
                this.state.cita.idEstatusCita,
                this.props.postulante.id_postulante_b,
                this.props.cita.empresa.id_empresa,
                this.props.cita.cliente.id_cliente,
                this.state.cita.id_cita
            )
                .then(response => {
                    console.log(response);
                })
                .catch(console.log);
            this.props.history.push('/consultarCita')//Esta linea de codigo redirecciona a otra vista.
        } else {
            console.log("selecciona una opción")
            alert("Selecciona un opción")
        }

    };

    render() {
        return (
            <React.Fragment>
                <br />
                <div align="center">
                    <td>
                        <ColoredLine color="black" />
                    </td>
                    <td>
                        <img className="agci" src={IconAge} alt="consultaCita" />
                    </td>
                    <td>
                        <ColoredLine color="black" />
                    </td>
                </div>
                <br />
                <div align="center">
                    <td>
                        <ColoredLine2 color="blue" />
                    </td>
                    <td>
                        <h3 className="label1">
                            &nbsp;
              {this.props.postulante.nombre +
                                " " +
                                this.props.postulante.apellido1 +
                                " " +
                                this.props.postulante.apellido2}
                        </h3>
                    </td>
                    <td>
                        <ColoredLine2 color="blue" />
                    </td>
                </div>

                <ValidatorForm className="form-agendar"
                    onSubmit={this.handleClick}
                    // onError={errors => console.log(errors)}
                >
                    <div className="row">
                        <div className="col">
                            <h3>
                                Entrevistador: &nbsp; &nbsp;
                                    <label className="datosCita">
                                    {" "}
                                    {this.props.cita.entrevistador}
                                </label>
                            </h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h3>
                                Fecha: &nbsp; &nbsp;
                                <label className="datosCita">{this.props.cita.fecha}</label>
                            </h3>
                        </div>
                        <div className="col">
                            <h3>
                                Hora: &nbsp; &nbsp;
                                 <label className="datosCita">{this.props.cita.hora}</label>
                            </h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="radio">
                            <h4>
                                <input
                                    type="radio"
                                    name="estatus"
                                    value={4}
                                    onClick={this.handleSelect}
                                />
                                &nbsp; &nbsp; Completada
                            </h4>
                        </div>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                         <div className="radio">
                            <h4>
                                <input
                                    type="radio"
                                    name="estatus"
                                    value={3}
                                    onClick={this.handleSelect}
                                />
                                &nbsp; &nbsp; Cancelada
                             </h4>
                        </div>
                    </div>
                    <div className="row">
                        <h4>
                            Comentarios:
                            <div>
                                <textarea
                                    class="cajatext"
                                    rows="3"
                                    value={this.state.comentarios}
                                    onChange={this.handleChange}
                                ></textarea>
                            </div>
                        </h4>
                    </div>
                    <div className="row">
                        <button
                            className="btn btn-primary"
                            type="submit"
                        >
                            Guardar
                        </button>
                        &nbsp; &nbsp;
                        <Link to="/consultarCita" className="btn btn-secondary">
                            Cancelar
                        </Link>
                    </div>
                </ValidatorForm>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        cita: state.cita,
        postulante: state.postulante
    };
};

export default connect(
    mapStateToProps,
    null
)(agrcom);
