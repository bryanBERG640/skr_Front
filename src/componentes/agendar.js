import React from "react";
import IconoAgendar from "../Imagenes/agendarcita.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postCita, putCita, putPostulanteB } from "../request/request";
import { setCita } from "../actions/postulanteB";
import { getEmpresa, getCliente } from "../request/request";
import { clickCompletarDatos } from "../actions/postulanteB";
import Autocompletado from "./Autocompletado/Autocommpletado";
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

class agendar extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            clientes: [],
            respEmpr: [],
            // fecha: "",
            idEmpresa: number,
            empresa: null,
            idCliente: this.props.cliente.id_cliente,
            cita: {
                fecha: null,
                hora: null,
                entrevistador: null,
                idEstatusCita: 1,
                idPostulante: this.props.postulante.id_postulante_b,
                usuario_actualiza: "Bryan Ramirez",
                fecha_actualizacion: date
            },
            c: {
                id_cita: undefined,
                fecha: undefined,
                hora: undefined,
                entrevistador: undefined,
                idEstatusCita: undefined,
                idPostulante: undefined,
                usuario_actualiza: undefined,
                fecha_actualizacion: undefined
            },
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
        ValidatorForm.addValidationRule("Vacio", string => {
            console.log("--Validacion" + string)
            if (string !== null && string !== ":00") return true;
        });
        ValidatorForm.addValidationRule("FechaActual", string => {
            console.log("Dentro de validarFechaActual")
            let fechaTotalActual = "";
            let fechaTotalRecibida = "";
            if (string !== null && string !== "" && fechaTotalRecibida >= fechaTotalActual) {
                const fecha = new Date();
                if (fecha.getDate() >= 1 && fecha.getDate() <= 9) {
                    if (fecha.getMonth() >= 1 && fecha.getMonth() <= 9) {
                        fechaTotalActual = fecha.getFullYear() + "0" + (fecha.getMonth() + 1) + "0" + fecha.getDate();
                    } else {
                        fechaTotalActual = fecha.getFullYear() + "" + (fecha.getMonth() + 1) + "0" + fecha.getDate();
                    }
                } else {
                    fechaTotalActual = fecha.getFullYear() + "" + (fecha.getMonth() + 1) + "" + fecha.getDate();
                }

                const subcadenas = string.split("-");
                const year = subcadenas[0];
                const month = subcadenas[1];
                const day = subcadenas[2];
                fechaTotalRecibida = year + "" + month + "" + day;

                if (fechaTotalRecibida >= fechaTotalActual) {
                    return true;
                }
            }
        });
        ValidatorForm.addValidationRule("FormatoHora", string => {
            if (string !== null) {
                const horaSplit = string.split(":");
                if (parseInt(horaSplit[0], 10) >= 9 && parseInt(horaSplit[0], 10) <= 18) return true
            }
        })
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
        // debugger
        console.log(e.target.value);
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
            }else { return false; }
        });
    };

    handleClick = e => {
        console.log("Dentro de la funcion handleClick")
        debugger
        let idCliente = this.props.cliente.id_cliente;
        if (this.props.cita !== undefined && this.props.cita !== "vacio") {
            console.log("Realizando put");
            const c = {
                id_cita: this.props.cita.id_cita,
                fecha: this.props.cita.fecha,
                hora: this.props.cita.hora,
                entrevistador: this.props.cita.entrevistador,
                usuario_actualiza: "Miguel",
                fecha_actualizacion: date
            }
            putCita(
                c,
                2,
                this.props.postulante.id_postulante_b,
                this.props.cita.empresa.id_empresa,
                idCliente,
                this.props.cita.id_cita
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
        console.log("Hora:" + this.state.cita.hora)
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
                                <TextValidator
                                    label="Fecha"
                                    type="date"
                                    value={this.state.cita.fecha}
                                    onChange={this.handleChangeDate}
                                    InputLabelProps={{
                                        shrink: true,
                                        variant: 'filled'
                                    }}
                                    validators={["required", "FechaActual"]}
                                    errorMessages={['El campo es obligatorio',
                                        'Coloca fecha futura']}
                                />

                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="row">
                            <div className="col">
                                <TextValidator
                                    className="form-control"
                                    style={{ width: 210 }}
                                    label="Entrevistador"
                                    id="entrevistador"
                                    onChange={this.handleWrite}
                                    name="entrevistador"
                                    value={this.state.cita.entrevistador}
                                    validators={["required", "isValidName"]}
                                    errorMessages={['El campo es requrido', 'Formato invalido']}
                                />
                            </div>

                            <div className="col espacio">
                                <TextValidator
                                    style={{ width: 210, paddingBottom: 10 }}
                                    InputLabelProps={{ shrink: true }}
                                    autoFocus="true"
                                    type="time"
                                    id="appt-time"
                                    name="appt-time"
                                    min="09:00" max="18:00"
                                    className="form-control appt-time"
                                    label="Hora"
                                    onChange={this.handleChangeTime}
                                    value={this.state.cita.hora}
                                    validators={["required", "Vacio", "FormatoHora"]}
                                    errorMessages={['El campo es obligatorio',
                                        'El campo esta vacio',
                                        'Formato invalido']}
                                />
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="row">
                            <div className="col">
                                <Autocompletado valores={this.state.clientes} placeH="Agregar cLiente" />
                            </div>
                            {/* <div className="row"> */}
                            <div className="col">
                                <button
                                    className="btn btn-primary btn-lg"
                                    type="submit"
                                >
                                    Agendar
                                    </button>
                            </div>
                            <div className="col">
                                <Link to="/consultarCita" className="btn btn-primary btn-lg">
                                    Cancelar
                                </Link>
                            </div>
                            {/* </div> */}
                        </div>
                        <div className="App-Component">
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
)(agendar);
