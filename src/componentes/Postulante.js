import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import IconoExamen from "../Imagenes/avatar.png";
import { connect } from "react-redux";
import { number } from "prop-types";
import {
    getCarrera, getEscuelas, getEstatusAprobacion, getEstatusTitulacion
    , getSexo, getEstatusCV, getPerfil, getEstatusPostulante,putPostulanteC
} from "../request/request";
import Autocompletado from './Autocompletado/Autocommpletado';
import { postPostulanteC } from '../request/request'

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: 500,
            marginBottom: 10
        }}
    />
);

const ColoredLine2 = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: 500,
            marginBottom: 10
        }}
    />
);

const divStyle = {
    overflowY: 'scroll',
    border: '1px solid red',
    width: '500px',
    float: 'left',
    height: '500px',
    position: 'relative'
};

class Postulante extends React.Component {
    state = {
        postulanteC: {
            ap: '',
            id_carrera: number,
        },
        acuerdo_economico: this.props.postulantec.acuerdo_economico,
        estatus_cv: this.props.postulantec.estatuscv.descripcion,
        pretencion_economica: this.props.postulantec.pretencion_economica,
        experiencia: this.props.postulantec.tiempo_experiencia,
        certificaciones: this.props.postulantec.certificaciones,
        estatusTit: this.props.postulantec.estatustitulacion.descripcion,
        estatusAp: this.props.postulantec.estatusprobacion.descripcion,
        rfc: this.props.postulantec.rfc,
        curp: this.props.postulantec.curp,
        sex: this.props.postulantec.sexo.descripcion,
        edad: this.props.postulantec.edad,
        fecha_nacimiento: this.props.postulantec.fecha_nacimiento,
        perf: this.props.postulantec.postulanteb.perfil.descripcion,
        estatusPostulante: this.props.postulantec.postulanteb.estatuspostulante.descripcion,
        comentarios: this.props.postulantec.postulanteb.observaciones,
        correo: this.props.postulantec.postulanteb.correo,
        celular: this.props.postulantec.postulanteb.celular,
        telefono: this.props.postulantec.postulanteb.telefono,
        nombre: this.props.postulantec.postulanteb.nombre,
        apellido2: this.props.postulantec.postulanteb.apellido2,
        apellido1: this.props.postulantec.postulanteb.apellido1,
        id_estatus_aprobacion: this.props.postulantec.estatusprobacion.id_estatus_aprobacion,
        id_estatus_cv: this.props.postulantec.estatuscv.id_estatus_cv,
        id_sexo: this.props.postulantec.sexo.id_sexo,
        id_estatus_titulacion: this.props.postulantec.estatustitulacion.id_estatus_titulacion,
        id_perfil: this.props.postulante.perfil.id_perfil,
        id_status_postulante: this.props.postulante.estatuspostulante.id_estatus_postulante,
        id_escuela: number,
        perfil: [],
        EstatusCV: [],
        EstatusAprobacion: [],
        EstatusTitulacion: [],
        EstatusPostulante: [],
        carrera: [],
        escuelas: [],
        sexo: [],
        pc: this.props.postulantec,
    }

    componentWillMount = () => {
        this.getCarrera()
        this.getEscuela()
        this.getEstatusAprobacion()
        this.getEstatusCV()
        this.getEstatusPostulante()
        this.getEstatusTitulacion()
        this.getSexo()
        this.getPerfil()
    }

    getCarrera = async () => {
        const nuevoGet = await getCarrera()
        this.setState({ carrera: nuevoGet.data })
    }

    getEscuela = async () => {
        const nuevoGet = await getEscuelas()
        this.setState({ escuelas: nuevoGet.data })
    }

    getEstatusAprobacion = async () => {
        const nuevoGet = await getEstatusAprobacion()
        this.setState({ EstatusAprobacion: nuevoGet.data })
    }

    getEstatusCV = async () => {
        const nuevoGet = await getEstatusCV()
        this.setState({ EstatusCV: nuevoGet.data })
    }

    getEstatusPostulante = async () => {
        const nuevoGet = await getEstatusPostulante()
        this.setState({ EstatusPostulante: nuevoGet.data })
    }

    getEstatusTitulacion = async () => {
        const nuevoGet = await getEstatusTitulacion()
        this.setState({ EstatusTitulacion: nuevoGet.data })
    }

    getSexo = async () => {
        const nuevoGet = await getSexo()
        this.setState({ sexo: nuevoGet.data })
    }

    getPerfil = async () => {
        const nuevoGet = await getPerfil()
        this.setState({ perfil: nuevoGet.data })
    }

    handleChangeDate = e => {
        this.setState({ fecha_nacimiento: e.target.value });
    };

    handleWrite = e => {
        if (e.target.name === "edad" || e.target.name === "pretencion_economica"
            || e.target.name === "acuerdo_economico" || e.target.name === "telefono"
            || e.target.name === "celular") {
            let ed = parseInt(e.target.value)
            this.setState({ [e.target.name]: ed })
        } else {
            this.setState({ [e.target.name]: e.target.value })
            console.log("Apellido------------: " + this.state.postulanteC.apellido1)
        }
    }

    syncHandle(valor) {
        this.setState({ ap: valor })
    }

    handleClick = e => {
        debugger
        console.log("Dentro de handleClick:")
        const requestPut = {
            fecha_nacimiento: this.state.fecha_nacimiento,
            edad: this.state.edad,
            curp: this.state.curp,
            rfc: this.state.rfc,
            pretencion_economica: this.state.pretencion_economica,
            certiicaciones: this.state.certificaciones,
            tiempo_experiencia: this.state.experiencia,
            acuerdo_economico: this.state.acuerdo_economico,
            foto_perfil: null,
            usuario_actualiza: "Bryan Ramirez",
            fecha_actualizacion: "2019-10-15"
        }
        const idPostulanteB = this.props.postulantec.postulanteb.id_postulante_b;
        const idEscuela =  this.props.postulantec.escuela.id_escuela;
        const idTitulacion = this.props.postulantec.estatustitulacion.id_estatus_titulacion;
        const idCarrera = this.props.postulantec.carrera.id_carrera;
        const idSexo = this.props.postulantec.sexo.id_sexo;
        const idCv = this.props.postulantec.estatuscv.id_estatus_cv;
        const idAprobacion = this.props.postulantec.estatusprobacion.id_estatus_aprobacion;
        console.log("Request del putt: " + requestPut)
        if (this.state.pc !== undefined) {
            console.log("Dentro de condicional if")
            putPostulanteC(requestPut, idPostulanteB, idEscuela, idTitulacion, idCarrera,
                idSexo, idCv, idAprobacion);
        } else {
            const request = {
                fecha_nacimiento: this.state.fecha_nacimiento,
                edad: this.state.edad,
                curp: this.state.curp,
                rfc: this.state.rfc,
                pretencion_economica: this.state.pretencion_economica,
                certiicaciones: this.state.certificaciones,
                tiempo_experiencia: this.state.experiencia,
                acuerdo_economico: this.state.acuerdo_economico,
                foto_perfil: null,
                usuario_actualiza: "Bryan Ramirez",
                fecha_actualizacion: "2019-10-15"
            }
            const idPostulanteB = this.props.postulante.id_postulante_b;
            const idEscuela = this.props.escuela.id_escuela;
            const idTitulacion = this.state.id_estatus_titulacion;
            const idCarrera = this.props.carrera.id_carrera;
            const idSexo = this.state.id_sexo;
            const idCv = this.state.id_estatus_cv;
            const idEstatusAprobacion = this.state.id_estatus_aprobacion;

            postPostulanteC(request, idPostulanteB, idEscuela,
                idTitulacion, idCarrera, idSexo, idCv, idEstatusAprobacion);
        }
    }


    handleSelectEstatusPostulante = e => {
        console.log("Dentro de handleSelect:");
        this.state.EstatusPostulante.map(estatusP => {
            if (estatusP.descripcion === e.target.value) {
                this.setState({
                    id_status_postulante: estatusP.id_estatus_postulante,
                    estatusPostulante: estatusP.descripcion
                });
            }
        });
    };
    handleSelectPerfil = e => {
        console.log("Dentro de handleSelect.");
        this.state.perfil.map(perfil => {
            if (perfil.descripcion === e.target.value) {
                this.setState({
                    id_perfil: perfil.id_perfil,
                    perf: perfil.descripcion
                });
            }
        })
    }
    handleSelectEstatusTitulacion = e => {
        console.log("Detnro de handle select:")
        this.state.EstatusTitulacion.map(estatusT => {
            if (estatusT.descripcion === e.target.value) {
                this.setState({
                    id_estatus_titulacion: estatusT.id_estatus_titulacion,
                    estatusTit: estatusT.descripcion
                })
            }
        })
    }
    handleSexo = e => {
        console.log("Dentro de handleSelect: ")
        this.state.sexo.map(sexo => {
            if (sexo.descripcion === e.target.value) {
                this.setState({
                    id_sexo: sexo.id_sexo,
                    sex: sexo.descripcion
                })
            }
        })
    }
    handleSelectEstatusCV = e => {
        console.log("Dentro de handleSelect:")
        this.state.EstatusCV.map(estatusCV => {
            if (estatusCV.descripcion === e.target.value) {
                this.setState({
                    id_estatus_cv: estatusCV.id_estatus_cv,
                    estatus_cv: estatusCV.descripcion
                });
            }
        })
    }
    handleSelectEstatusAprobacion = e => {
        console.log("Dentro de handleSelect:")
        this.state.EstatusAprobacion.map(estatusApr => {
            if (estatusApr.descripcion === e.target.value) {
                this.setState({
                    id_estatus_aprobacion: estatusApr.id_estatus_aprobacion,
                    estatusAp: estatusApr.descripcion
                });
            }
        })
    }

    render() {
        console.log("Valor carrera---: " + this.props.carrera.id_carrera)
        console.log("Valores escuela----: " + this.props.escuela.id_escuela)
        console.log("escuela: " + this.state.id_escuela)
        console.log("estatus_cv: " + this.state.estatus_cv)
        console.log("estatus_titulacion: " + this.state.estatusTit)
        console.log("sexo: " + this.state.sex)
        console.log("perfil: " + this.state.perf)
        console.log("estatus_postulante: " + this.state.estatusPostulante)
        console.log("comentarios: " + this.state.comentarios)
        console.log("correo: " + this.state.correo)
        console.log("celular: " + this.state.celular)
        console.log("telefono_fijo: " + this.state.telefono)
        console.log("nombe: " + this.state.nombre)
        console.log("apellido1: " + this.state.apellido1)
        console.log("apellido2: " + this.state.apellido2)
        console.log("fecha naci: " + this.state.fecha_nacimiento)
        console.log("edad: " + this.state.edad)
        console.log("curp: " + this.state.curp)
        console.log("rfc: " + this.state.rfc)
        console.log("estatusAprobacion: " + this.state.estatusAp)
        console.log("pretencion_economica: " + this.state.pretencion_economica)
        console.log("certificaciones: " + this.state.certificaciones)
        console.log("experiencia: " + this.state.experiencia)
        console.log("acuerdo_economico: " + this.state.acuerdo_economico)
        console.log("IdEstatusPostulante: " + this.state.id_status_postulante)
        console.log("IdPerfil: " + this.state.id_perfil)
        console.log("IdEstatusTitulacion: " + this.state.id_estatus_titulacion)
        console.log("IdSexo: " + this.state.id_sexo)
        console.log("IdEstatusCV: " + this.state.id_estatus_cv)
        console.log("IdEstatusAprobacion: " + this.state.id_estatus_aprobacion)

        const EstatusAprobaciones = this.state.EstatusAprobacion.map(EA => {
            return <option>{EA.descripcion}</option>
        })
        const CV = this.state.EstatusCV.map(estcv => {
            return <option>{estcv.descripcion}</option>
        })
        const EstPost = this.state.EstatusPostulante.map(EP => {
            return <option>{EP.descripcion}</option>
        })
        const EstTit = this.state.EstatusTitulacion.map(ET => {
            return <option>{ET.descripcion}</option>
        })
        const sexos = this.state.sexo.map(s => {
            return <option>{s.descripcion}</option>
        })
        const perfiles = this.state.perfil.map(per => {
            return <option>{per.descripcion}</option>
        })

        return (
            <React.Fragment className="cuerpo">
                <br />
                <div align="center">
                    <div align="center">
                        <td className="lineaEspacioDerecha">
                            <ColoredLine color="black" />
                        </td>
                        <td>
                            <h2>Postulante</h2>
                        </td>
                        <td className="lineaEspacioIzquierda">
                            <ColoredLine color="black" />
                        </td>
                    </div>
                </div>
                <br /><br />
                <form align="center">
                    <div className="row">
                        <div className="col-sm-10">
                            <div className="container">
                                <div className="row" align="center">
                                    <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                <label className="">Apellido Paterno:</label>
                                            </div>
                                            <div className="col">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="apellido1"
                                                    defaultValue={this.props.postulante.apellido1}
                                                    onChange={this.handleWrite}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                <label class="">Apellido Materno:</label>
                                            </div>
                                            <div className="col">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="apellido2"
                                                    onChange={this.handleWrite}
                                                    defaultValue={this.props.postulante.apellido2}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                <label className="">Nombre(s):</label>
                                            </div>
                                            <div className="col">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="nombre"
                                                    onChange={this.handleWrite}
                                                    defaultValue={this.props.postulante.nombre}></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br /><br />
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm">
                                                <label>Teléfono Fijo:</label>
                                            </div>
                                            <div className="col-sm">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="telefono"
                                                    onChange={this.handleWrite}
                                                    defaultValue={this.props.postulante.telefono}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm">
                                                <label>Celular:</label>
                                            </div>
                                            <div className="col-sm">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="celular"
                                                    onChange={this.handleWrite}
                                                    defaultValue={this.props.postulante.celular}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm-2">
                                                <label>Correo:</label>
                                            </div>
                                            <div className="col-sm-10">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="correo"
                                                    onChange={this.handleWrite}
                                                    defaultValue={this.props.postulante.correo}></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-sml-4">
                                        <div className="row">
                                            <div className="col">
                                                <label>Estatus Postulante:</label>
                                            </div>
                                            <div className="col">
                                                <select className="form-control" required name="estatusPostulante" onChange={this.handleSelectEstatusPostulante}>
                                                    <option value="1" selected disabled>{this.props.postulante.estatuspostulante.descripcion}</option>
                                                    {EstPost}
                                                </select>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col">
                                                <label>Perfil:</label>
                                            </div>
                                            <div className="col-sm-6">
                                                <select className="form-control labelBorder" required name="perf" onChange={this.handleSelectPerfil}>
                                                    <option value="1" selected disabled>{this.props.postulante.perfil.descripcion}</option>
                                                    {perfiles}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="row">
                                            <div className="col" >
                                                <label >Comentarios:</label>
                                            </div>
                                            <div className="col-sm-8">
                                                <textarea
                                                    class="textArea form-control"
                                                    rows="3"
                                                    cols="60"
                                                    name="comentarios"
                                                    onChange={this.handleWrite}
                                                    defaultValue={this.props.postulante.observaciones}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-1"></div>
                                <br />
                                <div className="row">
                                    <di className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label className="labelFecha">Fecha de nacimiento:</label>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField
                                                    type="date"
                                                    onChange={this.handleChangeDate}
                                                    defaultValue={this.props.postulantec.fecha_nacimiento}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </di>
                                    <di className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label>Edad:</label>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="text"
                                                    className="form-control"
                                                    name="edad"
                                                    onChange={this.handleWrite}
                                                    defaultValue={this.props.postulantec.edad}></input>
                                            </div>
                                        </div>
                                    </di>
                                    <br />
                                    <di className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label>Sexo:</label>
                                            </div>
                                            <div className="col-sm-6">
                                                <select className="form-control labelBorder" required name="sex" onChange={this.handleSexo}>
                                                    <option value="1" selected disabled>{this.props.postulantec.sexo.descripcion}</option>
                                                    {sexos}
                                                </select>
                                            </div>
                                        </div>
                                    </di>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label>CURP:</label>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="text"
                                                    className="form-control"
                                                    name="curp"
                                                    onChange={this.handleWrite}
                                                    defaultValue={this.props.postulantec.curp}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label>RFC:</label>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="text"
                                                    className="form-control"
                                                    name="rfc"
                                                    onChange={this.handleWrite}
                                                    defaultValue={this.props.postulantec.rfc} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label>Estatus Aprobación:</label>
                                            </div>
                                            <div className="col-sm-6">
                                                <select className="form-control" required name="estatusPostulante" onChange={this.handleSelectEstatusAprobacion}>
                                                    <option value="1" selected disabled>{this.props.postulantec.estatusprobacion.descripcion}</option>
                                                    {EstatusAprobaciones}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2 ">
                            <div className="row ">
                                <div className="col">
                                    <img className="agciAvatar" src={IconoExamen} alt="Examen" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div className="" align="center">
                        <td className="lineaEspacioDerecha2">
                            <ColoredLine2 color="blue" />
                        </td>
                        <td>
                            <h2>Escuela</h2>
                        </td>
                        <td className="lineaEspacioIzquierda2">
                            <ColoredLine2 color="blue" />
                        </td>
                    </div>
                    <br /><br />
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Escuela:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <Autocompletado
                                            valores={this.state.escuelas} valor={this.props.postulantec.escuela.descripcion} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Carrera:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <Autocompletado valores={this.state.carrera} valor={this.props.postulantec.carrera.descripcion} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Estatus Titulación:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <select className="form-control labelBorder" required name="estatus_titulacion" onChange={this.handleSelectEstatusTitulacion}>
                                            <option value="1" selected disabled>{this.props.postulantec.estatustitulacion.descripcion}</option>
                                            {EstTit}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Certificaciones:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text"
                                            className="form-control"
                                            name="certificaciones"
                                            onChange={this.handleWrite}
                                            defaultValue={this.props.postulantec.certificaciones} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Experiencia:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text"
                                            className="form-control"
                                            name="experiencia"
                                            onChange={this.handleWrite}
                                            defaultValue={this.props.postulantec.tiempo_experiencia} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="" align="center">
                        <td className="lineaEspacioDerecha2">
                            <ColoredLine2 color="blue" />
                        </td>
                        <td>
                            <h2>Perfil</h2>
                        </td>
                        <td className="lineaEspacioIzquierda2">
                            <ColoredLine2 color="blue" />
                        </td>
                    </div>
                    <br /><br />
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Pretención económica:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text"
                                            className="form-control"
                                            name="pretencion_economica"
                                            onChange={this.handleWrite}
                                            defaultValue={this.props.postulantec.pretencion_economica}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Estatus CV:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <select className="form-control labelBorder" required name="estatus_cv" onChange={this.handleSelectEstatusCV}>
                                            <option value="1" selected disabled>{this.props.postulantec.estatuscv.descripcion}</option>
                                            {CV}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Acuerdo económico:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text"
                                            className="form-control"
                                            name="acuerdo_economico"
                                            onChange={this.handleWrite}
                                            defaultValue={this.props.postulantec.acuerdo_economico} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div align="center">
                        <div className="container">
                            <div className="row justify-content-md-center">
                                <div className="col col-lg-2">
                                    {/* <Link  to="" className="btn btn-primary">Guardar</Link> */}
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={this.handleClick}>Guardar</button>
                                </div>
                                <div className="col-md-auto"></div>
                                <div className="col col-lg-2">
                                    <Link to="/consultar-Postulantes" className="btn btn-secondary"> Cancelar</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        postulante: state.postulante,
        carrera: state.carrera,
        escuela: state.escuela,
        postulantec: state.postulantec
    }
}

export default connect(mapStateToProps, null)(Postulante);