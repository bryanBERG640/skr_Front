import React from "react";
import IconoAgendar from "../Imagenes/agendarcita.png";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postCita, putCita, putPostulanteB } from "../request/request";
import { setCita } from "../actions/postulanteB";
import { getEmpresa, getCliente } from "../request/request";
import { clickCompletarDatos } from "../actions/postulanteB";
import Autocompletado from "./Autocompletado/Autocommpletado";
import "./styles/FormatoImagenes.css";
import { number } from "prop-types";
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: 500
        }}
    />
);
const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();
const date = anio + "-" + mes + "-" + dia;

class agendarPrueba extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            clientes: [],
            respEmpr: [],
            fecha: "",
            idEmpresa: number,
            empresa: null,
            idCliente: this.props.cliente.id_cliente,
            cita: {
                fecha: "",
                hora: null,
                entrevistador: null,
                idEstatusCita: 1,
                idPostulante: this.props.postulante.id_postulante_b,
                usuario_actualiza: "Bryan Ramirez",
                fecha_actualizacion: date
            },
            c: this.props.cita,
            postulante: {
                id_postulante_b: this.props.postulante.id_postulante_b,
                nombre: this.props.postulante.nombre,
                apellido1: this.props.postulante.apellido1,
                apellido2: this.props.postulante.apellido2,
                correo: this.props.postulante.correo,
                celular: this.props.postulante.celular,
                telefono: this.props.postulante.telefono,
                usuario_actualiza: this.props.postulante.usuario_actualiza,
                fecha_actualizacion: this.props.postulante.fecha_actualizacion
            }
        };
    }

    componentWillMount = () => {
        this.getCliente();
        this.getEmpresa();
        ValidatorForm.addValidationRule("isValidName", (string) => /[a-zA-Z \u00E0-\u00FC]{1,20}/g.test(string));
        // ValidatorForm.addValidationRule("formatHora", (string) => /^[0-9ampm]*$/.test(string)); 
    };
    getCliente = async () => {
        const nuevoGet = await getCliente();
        this.setState({ clientes: nuevoGet.data });
    };
    getEmpresa = async () => {
        const nuevoGet = await getEmpresa();
        this.setState({ respEmpr: nuevoGet.data });
    };

    handleChange = e => {
        //console.log(e.target.value);
        let cit = this.state.cita;
        cit.entrevistador = e.target.value;
        this.setState({ cita: cit });
    };

    handleChangeDate = e => {
        //console.log(e.target.value);
        let cit = this.state.cita;
        cit.fecha = e.target.value;
        this.setState({ cita: cit });
    };

    handleChangeTime = e => {
        console.log(e)
        let cit = this.state.cita;
        cit.hora = e.target.value + ":00";
        this.setState({ cita: cit });
    };

    handleSelect = e => {
        this.state.respEmpr.map(emp => {
            if (emp.descripcion === e.target.value) {
                this.setState({ 
                    idEmpresa: emp.id_empresa,
                    empresa: emp.descripcion
                });
            }
        });
    };

    handleClick = e => {
        console.log("Dentro de la funcion handleClick")
       
        let idCliente = this.props.cliente.id_cliente;
        if (this.state.c !== "vacio") {
            console.log("Realizando put");
            putCita(
                this.state.c,
                2,
                this.props.postulante.id_postulante_b,
                this.state.idEmpresa,
                idCliente,
                this.state.c.id_cita
            )
                .then(response => {
                    console.log(response);
                })
                .catch(console.log);
        }
        console.log("Realizando Post");
        postCita(
            this.state.cita,
            this.state.cita.idEstatusCita,
            this.state.cita.idPostulante,
            this.state.idEmpresa,
            idCliente
        )
            .then(response => {
                console.log(response);
            })
            .catch(console.log);

        console.log("Realizando put a PB");

        putPostulanteB(
            this.state.postulante,
            2,
            this.props.postulante.perfil.id_perfil,
            this.props.postulante.id_postulante_b
        )
            .then(response => {
                console.log(response);
            })
            .catch(console.log);

            this.props.history.push('/consultarCita')//Esta linea de codigo redirecciona a otra vista.
    };

    handleWrite = e => {
        let cit = this.state.cita;
        if (e.target.name === "entrevistador") {
            cit.entrevistador = e.target.value;
            this.setState({ cita: cit });
        }
    };

    render() {
        console.log("--"+this.state.cita.hora)
        const { respEmpr } = this.state;
        const empresa = respEmpr.map(empr => {
            return <option value={empr.descripcion}>{empr.descripcion}</option>;
        });
        return (
            <React.Fragment>
                <div align="center">
                    <td>
                        <ColoredLine color="black" />
                    </td>
                    <td>
                        <img className="agci" src={IconoAgendar} alt="agendar cita" />
                    </td>
                    <td>
                        <ColoredLine color="black" />
                    </td>
                </div>
                <div align="center">
                    <h3>
                        {this.props.postulante.nombre}&nbsp;
            {this.props.postulante.apellido1}&nbsp;
            {this.props.postulante.apellido2}
                    </h3>
                </div>
                <br />
                <br />
                <div className="row">
                    <ValidatorForm 
                        className="form-agendar"
                        onSubmit={this.handleClick}
                        onError={errors => console.log(errors)}    
                    >
                        <div className="row">
                            <div className="col">
                                <SelectValidator
                                    className="form-control"
                                    style={{ width: 210 }}
                                    text-align="left"
                                    label="Empresa"
                                    value={this.state.empresa}
                                    onChange={this.handleSelect}
                                    name="empresa"
                                    validators={["required"]}
                                    errorMessages={["Campo Obligatorio"]}
                                >
                                    <option>Empresas</option>
                                    {empresa}
                                </SelectValidator>
                            </div>
                            <div className="col">
                                {/* <label className="label1">Cliente:</label> */}
                                <Autocompletado valores={this.state.clientes} />
                            </div>
                        </div>
                        <br/>
                            <br/>
                            <br/>
                        <div className="row">
                            <div className="col">
                                {/* <label className="label1">Entrevistador:</label>
                                <input
                                    className="form-control"
                                    name="entrevistador"
                                    type="text"
                                    value={this.state.value}
                                    onChange={this.handleWrite}
                                /> */}
                                <TextValidator
                                    className="form-control"
                                    label="Entrevistador"
                                    id="entrevistador"
                                    onChange={this.handleWrite}
                                    name="entrevistador"
                                    value={this.state.cita.entrevistador}
                                    validators={["required", "isValidName"]}
                                    errorMessages={['El campo es requrido', 'Formato invalido']}
                                />
                            </div>
                            
                            <div className="col">
                                {/* <label className="label1">Hora:</label>
                                <input
                                    className="form-control"
                                    type="time"
                                    name="hora"
                                    value={this.state.hora}
                                    onChange={this.handleChangeTime}
                                /> */}
                                <TextValidator
                                    type="time"
                                    className="form-control"
                                    label="Hora"
                                    id="hora"
                                    onChange={this.handleChangeTime}
                                    name="hora"
                                    value={this.state.cita.hora}
                                    validators={["required"]}
                                    errorMessages={['El campo es obligatorio']}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <label className="label1">Fecha:</label>
                                <TextField
                                    type="date"
                                    onChange={this.handleChangeDate}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />

                            </div>
                            <div className="row">
                                <div className="col">
                                    <button
                                        className="btn btn-primary btn-lg"
                                        type="submit"
                                    >
                                        Agendar
                                    </button>
                                </div>
                                <div className="col">
                                    <Link to="/consultar-Postulantes" className="btn btn-primary">
                                        Cancelar
                                </Link>
                                </div>
                            </div>
                        </div>
                    </ValidatorForm>
                </div>
            </React.Fragment>
        );
    }
}

//Se accede al store de postulante y postulante. Pude usar los valores de cualquiera de los dos.
const mapStateToProps = state => {
    return {
        postulante: state.postulante,
        postulantec: state.postulantec,
        cita: state.cita,
        cliente: state.cliente,
        state: value => state(setCita(value))
    };
};

const mapDispatchProps = dispatch => ({
    dispatchClickCompletarDatos: value => dispatch(clickCompletarDatos(value))
});

export default connect(
    mapStateToProps,
    mapDispatchProps
)(agendarPrueba);
