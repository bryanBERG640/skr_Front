import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import IconoExamen from "../Imagenes/avatar.png";
import { connect } from "react-redux";
import { number } from "prop-types";
import {
    getCarrera, getEscuelas, getEstatusAprobacion, getEstatusTitulacion
    , getSexo, getEstatusCV, getPerfil, getEstatusPostulante
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
            estatus_cv: "",
            estatus_titulacion: "",
            sex: "",
            perf: "",
            estatusPostulante: "",
            comentarios: "",
            correo: "",
            celular: "",
            telefono: "",
            nombre: "",
            apellido1: "",
            apellido2: "",
            fecha_nacimiento: "",
            edad: number,
            id_carrera: number,
            curp: "",
            rfc: "",
            pretencion_economica: number,
            certificaciones: "",
            experiencia: "",
            acuerdo_economico: number,
        },
        id_estatus_aprobacion: number,
        id_estatus_cv: number,
        id_sexo: number,
        id_estatus_titulacion: number,
        id_perfil: number,
        id_status_postulante: number,
        id_escuela: number,
        perfil: [],
        EstatusCV: [],
        EstatusAprobacion: [],
        EstatusTitulacion: [],
        EstatusPostulante: [],
        carrera: [],
        escuelas: [],
        sexo: [],
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
        }
    }

    handleClick = e => {
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


    handleSelectEstatusPostulante = e => {
        console.log("Dentro de handleSelect:");
        this.state.EstatusPostulante.map(estatusP => {
            if (estatusP.descripcion === e.target.value) {
                this.setState({ id_status_postulante: estatusP.id_estatus_postulante });
            }
        });
    };
    handleSelectPerfil = e => {
        console.log("Dentro de handleSelect.");
        this.state.perfil.map(perfil => {
            if (perfil.descripcion === e.target.value) {
                this.setState({ id_perfil: perfil.id_perfil });
            }
        })
    }
    handleSelectEstatusTitulacion = e => {
        console.log("Detnro de handle select:")
        this.state.EstatusTitulacion.map(estatusT => {
            if (estatusT.descripcion === e.target.value) {
                this.setState({ id_estatus_titulacion: estatusT.id_estatus_titulacion })
            }
        })
    }
    handleSexo = e => {
        console.log("Dentro de handleSelect: ")
        this.state.sexo.map(sexo => {
            if (sexo.descripcion === e.target.value) {
                this.setState({ id_sexo: sexo.id_sexo })
            }
        })
    }
    handleSelectEstatusCV = e => {
        console.log("Dentro de handleSelect:")
        this.state.EstatusCV.map(estatusCV => {
            if (estatusCV.descripcion === e.target.value) {
                this.setState({ id_estatus_cv: estatusCV.id_estatus_cv });
            }
        })
    }
    handleSelectEstatusAprobacion = e => {
        debugger
        console.log("Dentro de handleSelect:")
        this.state.EstatusAprobacion.map(estatusApr => {
            if(estatusApr.descripcion === e.target.value) {
                this.setState({ id_estatus_aprobacion: estatusApr.id_estatus_aprobacion });
            }
        })
    }

    render() {

        console.log("Valor carrera---: " + this.props.carrera.id_carrera)
        console.log("Valores escuela----: " + this.props.escuela.id_escuela)
        console.log("escuela: " + this.state.id_escuela)
        console.log("estatus_cv: " + this.state.estatus_cv)
        console.log("estatus_titulacion: " + this.state.estatus_titulacion)
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
                                                    onChange={this.handleWrite}
                                                    value={this.props.postulante.apellido1}></input>
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
                                                    value={this.props.postulante.apellido2}></input>
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
                                                    value={this.props.postulante.nombre}></input>
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
                                                    value={this.props.postulante.telefono}></input>
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
                                                    value={this.props.postulante.celular}></input>
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
                                                    value={this.props.postulante.correo}></input>
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
                                                    value={this.props.postulante.observaciones}></textarea>
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
                                                    onChange={this.handleWrite}></input>
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
                                                    <option value="1" selected disabled>Sexo</option>
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
                                                    onChange={this.handleWrite}></input>
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
                                                    onChange={this.handleWrite} />
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
                                                    <option value="1" selected disabled>{this.props.postulante.estatuspostulante.descripcion}</option>
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
                                            valores={this.state.escuelas} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Carrera:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <Autocompletado valores={this.state.carrera} />
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
                                            <option value="1" selected disabled>Selecciona</option>
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
                                            onChange={this.handleWrite} />
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
                                            onChange={this.handleWrite} />
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
                                            onChange={this.handleWrite}></input>
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
                                            <option value="1" selected disabled>Selecciona</option>
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
                                            onChange={this.handleWrite} />
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
        escuela: state.escuela
    }
}

export default connect(mapStateToProps, null)(Postulante);