import React from "react";
import { Link } from "react-router-dom";
import IconoExamen from "../Imagenes/avatar.png";
import { connect } from "react-redux";
import {
    getCarrera, getEscuelas, getEstatusAprobacion, getEstatusTitulacion, getSexo, getEstatusCV, getPerfil, getEstatusPostulante, putPostulanteC,
    postPostulanteC, putPostulanteB
} from "../request/request";
import Autocompletado from './Autocompletado/Autocommpletado';
import {ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator'
import {setPostulante, setPostulanteC} from '../actions/postulanteB'

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


const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();
const date = anio + "-" + mes + "-" + dia;

class Postulante extends React.Component {
    state = {
        postulanteC: {
            ap: "",
            id_carrera: null,
        },
        carr: "",
        escuel: "",
        acuerdo_economico: "",
        estatus_cv: "",
        pretencion_economica: "",
        experiencia: "",
        certificaciones: "",
        estatusTit: "",
        estatusAp: "",
        rfc: "",
        curp: "",
        sex: "",
        edad: "",
        fecha_nacimiento: "",
        perf: "",
        estatusPostulante: "",
        comentarios: "",
        correo: "",
        celular: "",
        telefono: "",
        nombre: "",
        apellido2: "",
        apellido1: "",
        id_postulante_b: null,
        id_estatus_aprobacion: null,
        id_estatus_cv: null,
        id_sexo: null,
        id_estatus_titulacion: null,
        id_perfil: null,
        id_status_postulante: null,
        id_escuela: this.props.escuela.id_escuela,
        id_carrera: this.props.carrera.id_carrera,
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
        this.getCarrera();
        this.getEscuela();
        this.getEstatusAprobacion();
        this.getEstatusCV();
        this.getEstatusPostulante();
        this.getEstatusTitulacion();
        this.getSexo();
        this.getPerfil();
        this.setearState();
        ValidatorForm.addValidationRule("formatoLetras", string =>
      /^[a-zA-ZñÑ\-_'áéíóúÁÉÍÓÚ -]*$/.test(string)
    );
    ValidatorForm.addValidationRule("formatoNumeros", string =>
      /^[0-9 -]*$/.test(string)
    );
    ValidatorForm.addValidationRule("Longitud1", string => {
      if (string.length <= 40) return true;
      else return false;
    });
    ValidatorForm.addValidationRule("Longitud2", string => {
      if (string.length === 10) return true;
      else return false;
    });
    ValidatorForm.addValidationRule("Curp", string=>
    {
        if(string.length===18) return true;
    })
    ValidatorForm.addValidationRule("Rfc", string=>
    {
        if(string.length<=13) return true;
    })
    ValidatorForm.addValidationRule("Mayusculas", string=>
    /^[A-ZÑ0-9]*$/.test(string))
    ValidatorForm.addValidationRule("isValidName", (string) => /[a-zA-Z \u00E0-\u00FC]{1,20}/g.test(string));

    if(this.props.postulante!=="Vacio")
    {
        const per = this.props.postulante.perfil.id_perfil;
      const ep = this.props.postulante.estatuspostulante.id_estatus_postulante;
        this.setState({
            id_postulante_b:this.props.postulante.id_postulante_b,
            apellido1: this.props.postulante.apellido1,
        apellido2: this.props.postulante.apellido2,
        nombre: this.props.postulante.nombre,
        correo: this.props.postulante.correo,
        telefono: this.props.postulante.telefono,
        celular: this.props.postulante.celular,
        observaciones: this.props.postulante.observaciones,
        usuario_actualiza: "Bryan Ramirez",
        fecha_actualizacion: date
        })
        this.setState({ id_perfil: per });
        this.setState({ id_status_postulante: ep });
    }

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
        this.setState({ [e.target.name]: e.target.value })
   }

    syncHandle(valor) {
        this.setState({ ap: valor })
    }

    handleClick = e => {
        //debugger
       // console.log("Dentro de handleClick:")
        if (this.state.pc !== undefined) {
            const requestPostulanteB = {
                id_postulante_b: this.state.id_postulante_b,
                nombre: this.state.nombre,
                apellido1: this.state.apellido1,
                apellido2: this.state.apellido2,
                celular: this.state.celular,
                telefono: this.state.telefono,
                correo: this.state.correo,
                observaciones: this.state.comentarios,
                cv: null,
                usuario_actualiza: "Bryan Ramirez",
                fecha_actualizacion: date
            }
            const idEstatusPostulante = this.state.id_status_postulante;
            const IdPerfil = this.state.id_perfil;
            const idPostulanteB1 = this.state.id_postulante_b;
            putPostulanteB(requestPostulanteB,idEstatusPostulante,IdPerfil,idPostulanteB1)
            .then(response=>
                {
                    console.log(response)
                }).catch(console.log)

            const requestPut = {
                id_postulante_c: this.props.postulantec.id_postulante_c,
                fecha_nacimiento: this.state.fecha_nacimiento,
                edad: this.state.edad,
                curp: this.state.curp,
                rfc: this.state.rfc,
                pretencion_economica: this.state.pretencion_economica,
                certificaciones: this.state.certificaciones,
                tiempo_experiencia: this.state.experiencia,
                acuerdo_economico: this.state.acuerdo_economico,
                foto_perfil: null,
                usuario_actualiza: "Bryan Ramirez",
                fecha_actualizacion: date
            }
            const idPostulanteB = this.props.postulantec.postulanteb.id_postulante_b;
            const idEscuela = this.props.escuela.id_escuela;
            const idTitulacion = this.state.id_estatus_titulacion;
            const idCarrera = this.props.carrera.id_carrera;
            const idSexo = this.state.id_sexo;
            const idCv = this.state.id_estatus_cv;
            const idAprobacion = this.state.id_estatus_aprobacion;
            const idPostulanteComplemento = this.props.postulantec.id_postulante_c;
            console.log("Request del putt: " + requestPut)
            console.log("Dentro de condicional if")
            putPostulanteC(requestPut, idPostulanteB, idEscuela, idTitulacion, idCarrera,
                idSexo, idCv, idAprobacion, idPostulanteComplemento)
                .then(response=>
                    {
                        console.log(response)
                    }).catch(console.log)
        } else {
            const request = {
                fecha_nacimiento: this.state.fecha_nacimiento,
                edad: this.state.edad,
                curp: this.state.curp,
                rfc: this.state.rfc,
                pretencion_economica: this.state.pretencion_economica,
                certificaciones: this.state.certificaciones,
                tiempo_experiencia: this.state.experiencia,
                acuerdo_economico: this.state.acuerdo_economico,
                foto_perfil: null,
                usuario_actualiza: "Bryan Ramirez",
                fecha_actualizacion: date
            }
            const idPostulanteB = this.props.postulante.id_postulante_b;
            const idEscuela = this.props.escuela.id_escuela;
            const idTitulacion = this.state.id_estatus_titulacion;
            const idCarrera = this.props.carrera.id_carrera;
            const idSexo = this.state.id_sexo;
            const idCv = this.state.id_estatus_cv;
            const idEstatusAprobacion = this.state.id_estatus_aprobacion;

            postPostulanteC(request, idPostulanteB, idEscuela,
                idTitulacion, idCarrera, idSexo, idCv, idEstatusAprobacion)
                .then(response=>
                    {
                        console.log(response)
                    }).catch(console.log)
        }
    }

    handleEstatusPostulante = e => {
        this.setState({ id_status_postulante: e.target.value });
      };

    handlePerfil = e => {
        this.setState({ id_perfil: e.target.value });
    };
   
    handleSelectEstatusTitulacion = e => {
        //console.log("Detnro de handle select:")
        this.setState({id_estatus_titulacion: e.target.value})
    }
    handleSexo = e => {
        //console.log("Dentro de handleSelect: ")
        this.setState({id_sexo: e.target.value})
    }
    handleSelectEstatusCV = e => {
        //console.log("Dentro de handleSelect:")
                this.setState({id_estatus_cv: e.target.value})
    }
    handleSelectEstatusAprobacion = e => {
        //console.log("Dentro de handleSelect:")
                this.setState({
                    id_estatus_aprobacion: e.target.value
                });
    }

    setearState = e => {
        //console.log("Hola desde setearState")
        if (this.props.postulantec !== undefined && this.props.postulantec !== null) {
            //console.log("Hola desde if")
            this.setState({
                id_postulante_b: this.props.postulantec.postulanteb.id_postulante_b,
                id_perfil: this.props.postulantec.postulanteb.perfil.id_perfil,
                id_status_postulante: this.props.postulantec.postulanteb.estatuspostulante.id_estatus_postulante,
                comentarios: this.props.postulantec.postulanteb.observaciones,
                correo: this.props.postulantec.postulanteb.correo,
                celular: this.props.postulantec.postulanteb.celular,
                telefono: this.props.postulantec.postulanteb.telefono,
                nombre: this.props.postulantec.postulanteb.nombre,
                apellido2: this.props.postulantec.postulanteb.apellido2,
                apellido1: this.props.postulantec.postulanteb.apellido1,
                carr: this.props.postulantec.carrera.descripcion,
                fecha_nacimiento: this.props.postulantec.fecha_nacimiento,
                escuel: this.props.postulantec.escuela.descripcion,
                edad: this.props.postulantec.edad,
                sex: this.props.postulantec.sexo.descripcion,
                curp: this.props.postulantec.curp,
                rfc: this.props.postulantec.rfc,
                estatusAp: this.props.postulantec.estatusprobacion.descripcion,
                estatusTit: this.props.postulantec.estatustitulacion.descripcion,
                certificaciones: this.props.postulantec.certificaciones,
                experiencia: this.props.postulantec.tiempo_experiencia,
                pretencion_economica: this.props.postulantec.pretencion_economica,
                estatus_cv: this.props.postulantec.estatuscv.descripcion,
                acuerdo_economico: this.props.postulantec.acuerdo_economico,
                id_estatus_titulacion: this.props.postulantec.estatustitulacion.id_estatus_titulacion,
                id_sexo: this.props.postulantec.sexo.id_sexo,
                id_estatus_cv: this.props.postulantec.estatuscv.id_estatus_cv,
                id_estatus_aprobacion: this.props.postulantec.estatusprobacion.id_estatus_aprobacion,
                id_carrera: this.props.postulantec.carrera.id_carrera,
                id_escuela: this.props.postulantec.escuela.id_escuela

            })
        }
    }

    handleSubmit=e =>
    {
        console.warn("submit")
        console.log("nombe: " + this.state.nombre)
        console.log("apellido1: " + this.state.apellido1)
        console.log("apellido2: " + this.state.apellido2)
        console.log("correo: " + this.state.correo)
        console.log("celular: " + this.state.celular)
        console.log("telefono_fijo: " + this.state.telefono)
        console.log("IdPerfil: " + this.state.id_perfil)
        console.log("IdEstatusPostulante: " + this.state.id_status_postulante)
        console.log("IdPostulante: " + this.state.id_postulante_b)
        console.log("fecha naci: " + this.state.fecha_nacimiento)
        console.log("edad: " + this.state.edad)
        console.log("IdEstatusTitulacion: " + this.state.id_estatus_titulacion)
        console.log("Valor carrera---: " + this.state.id_carrera)
        console.log("Valores escuela----: " + this.state.id_escuela)
        console.log("curp: " + this.state.curp)
        console.log("rfc: " + this.state.rfc)
        console.log("IdSexo: " + this.state.id_sexo)
        console.log("pretencion_economica: " + this.state.pretencion_economica)
        console.log("certificaciones: " + this.state.certificaciones)
        console.log("experiencia: " + this.state.experiencia)
        console.log("IdEstatusCV: " + this.state.id_estatus_cv)
        console.log("IdEstatusAprobacion: " + this.state.id_estatus_aprobacion)
        console.log("acuerdo_economico: " + this.state.acuerdo_economico)
        console.log("comentarios: " + this.state.comentarios)

        if(this.state.nombre!=="" &&
        this.state.apellido1!=="" &&
        this.state.apellido2!=="" &&
        this.state.correo!=="" &&
        this.state.celular!=="" &&
        this.state.telefono!=="" &&
        this.state.id_perfil!==null &&
        this.state.id_status_postulante!==null &&
        this.state.id_postulante_b!==null &&
        this.state.fecha_nacimiento!=="" &&
        this.state.edad!=="" &&
        this.state.id_estatus_titulacion!==null &&
        this.state.id_escuela!==null &&
        this.state.id_carrera!==null &&
        this.state.curp!=="" &&
        this.state.rfc!=="" &&
        this.state.id_sexo!==null &&
        this.state.pretencion_economica!=="" &&
        this.state.certificaciones!=="" &&
        this.state.experiencia!=="" &&
        this.state.id_estatus_cv!==null &&
        this.state.id_estatus_aprobacion!==null &&
        this.state.acuerdo_economico!=="")
        {
            console.log("aprobado")
            const ed=parseInt(this.state.edad)
            const ae=parseInt(this.state.acuerdo_economico)
            const pe=parseInt(this.state.pretencion_economica)
            const requestPostulanteB = {
                id_postulante_b: this.state.id_postulante_b,
                nombre: this.state.nombre,
                apellido1: this.state.apellido1,
                apellido2: this.state.apellido2,
                celular: this.state.celular,
                telefono: this.state.telefono,
                correo: this.state.correo,
                observaciones: this.state.comentarios,
                cv: null,
                usuario_actualiza: "Bryan Ramirez",
                fecha_actualizacion: date
            }
            const idEstatusPostulante = this.state.id_status_postulante;
            const IdPerfil = this.state.id_perfil;
            const idPostulanteB1 = this.state.id_postulante_b;
            putPostulanteB(requestPostulanteB,idEstatusPostulante,IdPerfil,idPostulanteB1)
            .then(response=>
                {
                    console.log(response)
                }).catch(console.log)
            if (this.state.pc !== undefined && this.state.pc!==null) {
                  
                const requestPut = {
                    id_postulante_c: this.props.postulantec.id_postulante_c,
                    fecha_nacimiento: this.state.fecha_nacimiento,
                    edad: ed,
                    curp: this.state.curp,
                    rfc: this.state.rfc,
                    pretencion_economica: pe,
                    certificaciones: this.state.certificaciones,
                    tiempo_experiencia: this.state.experiencia,
                    acuerdo_economico: ae,
                    foto_perfil: null,
                    usuario_actualiza: "Bryan Ramirez",
                    fecha_actualizacion: date
                }
                
                const idEscuela = this.state.id_escuela;
                const idTitulacion = this.state.id_estatus_titulacion;
                const idCarrera = this.state.id_carrera;
                const idSexo = this.state.id_sexo;
                const idCv = this.state.id_estatus_cv;
                const idAprobacion = this.state.id_estatus_aprobacion;
                const idPostulanteComplemento = this.props.postulantec.id_postulante_c;
                putPostulanteC(requestPut, idPostulanteB1, idEscuela, idTitulacion, idCarrera,
                    idSexo, idCv, idAprobacion, idPostulanteComplemento)
                    .then(response=>
                        {
                            console.log(response)
                        }).catch(console.log)
             
                        this.props.history.push("/consultar-Postulantes");
            } else {
                const request = {
                    fecha_nacimiento: this.state.fecha_nacimiento,
                    edad: ed,
                    curp: this.state.curp,
                    rfc: this.state.rfc,
                    pretencion_economica: pe,
                    certificaciones: this.state.certificaciones,
                    tiempo_experiencia: this.state.experiencia,
                    acuerdo_economico: ae,
                    foto_perfil: null,
                    usuario_actualiza: "Bryan Ramirez",
                    fecha_actualizacion: date
                }
                const idPostulanteB = this.props.postulante.id_postulante_b;
                const idEscuela = this.props.escuela.id_escuela;
                const idTitulacion = this.state.id_estatus_titulacion;
                const idCarrera = this.props.carrera.id_carrera;
                const idSexo = this.state.id_sexo;
                const idCv = this.state.id_estatus_cv;
                const idEstatusAprobacion = this.state.id_estatus_aprobacion;
    
                postPostulanteC(request, idPostulanteB, idEscuela,
                    idTitulacion, idCarrera, idSexo, idCv, idEstatusAprobacion)
                    .then(response=>
                        {
                            console.log(response)
                        }).catch(console.log)
                
                        this.props.history.push("/consultar-Postulantes");
            }
            this.props.dispatchSetPostulante("Vacio")
                        this.props.dispatchSetPostulanteC("vacio")
                
        }

    }

    render() {
        
        
        const EstatusAprobaciones = this.state.EstatusAprobacion.map(EA => {
            return <option value={EA.id_estatus_aprobacion}>{EA.descripcion}</option>
        })
        const CV = this.state.EstatusCV.map(estcv => {
            return <option value={estcv.id_estatus_cv}>{estcv.descripcion}</option>
        })
        const EstPost = this.state.EstatusPostulante.map(EP => {
            return <option value={EP.id_estatus_postulante}>{EP.descripcion}</option>
        })
        const EstTit = this.state.EstatusTitulacion.map(ET => {
            return <option value={ET.id_estatus_titulacion}>{ET.descripcion}</option>
        })
        const sexos = this.state.sexo.map(s => {
            return <option value={s.id_sexo}>{s.descripcion}</option>
        })
        const perfiles = this.state.perfil.map(per => {
            return <option value={per.id_perfil}>{per.descripcion}</option>
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
                <ValidatorForm ref="form"
                onSubmit={this.handleSubmit}
                onError={errors=>console.log(errors)}
                 align="center">
                    <div className="container">
                        <div className="row">
                            <div style={{marginRight:30}} align="left">
                            <TextValidator
                                style={{marginLeft: 20, width:250}}
                                label="Apellido Paterno"
                                onChange={this.handleWrite}
                                name="apellido1"
                                value={this.state.apellido1}
                                validators={["required", "formatoLetras", "Longitud1"]}
                                errorMessages={["Campo Obligatorio", 
                                "Ingrese solo Letras", 
                                "Solo se permiten 40 caracteres"]}/>
                            </div>
                            <div  style={{marginRight:30}} align="center">
                            <TextValidator
                                style={{marginLeft: 20, width:250}}
                                label="Apellido Materno"
                                onChange={this.handleWrite}
                                name="apellido2"
                                value={this.state.apellido2}
                                validators={["required", "formatoLetras", "Longitud1"]}
                                errorMessages={["Campo Obligatorio", 
                                "Ingrese solo Letras", 
                                "Solo se permiten 40 caracteres"]}/>
                            </div>
                            <div style={{marginRight:30}} align="right">
                            <TextValidator
                                            style={{marginLeft: 20, width:250}}
                                            label="Nombre"
                                            onChange={this.handleWrite}
                                            name="nombre"
                                            value={this.state.nombre}
                                            validators={["required", "formatoLetras", "Longitud1"]}
                                            errorMessages={["Campo Obligatorio", 
                                            "Ingrese solo Letras", 
                                            "Solo se permiten 40 caracteres"]}/>
                            </div>
                            <div align="right" style={{height:100}}>
                                <img className="agciAvatar" 
                                    src={IconoExamen} 
                                    alt="Examen" 
                                    style={{marginTop:0}}
                                />
                            </div>
                            <br/>
                            <div style={{marginRight:30}} align="left">
                            <TextValidator
                                    style={{ marginLeft: 20, width: 200 }}
                                    label="Telefono"
                                    onChange={this.handleWrite}
                                    name="telefono"
                                    value={this.state.telefono}
                                    validators={["required", "formatoNumeros", "Longitud2"]}
                                    errorMessages={[
                                    "Campo Obligatorio",
                                    "Ingrese solo Numeros",
                                    "Deben ser 10 digitos"
                                    ]}
                                />
                            </div>
                            <div  style={{marginRight:30}} align="center">
                                <TextValidator
                                    style={{ marginLeft: 40, width: 200 }}
                                    label="Celular"
                                    onChange={this.handleWrite}
                                    name="celular"
                                    value={this.state.celular}
                                    validators={["required", "formatoNumeros", "Longitud2"]}
                                    errorMessages={[
                                    "Campo Obligatorio",
                                    "Ingrese solo Numeros",
                                    "Deben ser 10 digitos"
                                    ]}
                                />
                            </div>
                            <div style={{marginRight:30}} align="right">
                                <TextValidator
                                    style={{marginLeft: 20, width:300}}
                                    label="Correo"
                                    onChange={this.handleWrite}
                                    name="correo"
                                    value={this.state.correo}
                                    validators={["required"]}
                                    errorMessages={["Campo Obligatorio"]}
                                />
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div className="row">
                            <div style={{marginRight:30}} align="left">
                                <SelectValidator
                                    className="seleccion"
                                    style={{ width: 250 , marginLeft:22}}
                                    label="Estatus Postulante"
                                    name="id_status_postulante"
                                    value={this.state.id_status_postulante}
                                    onChange={this.handleEstatusPostulante}
                                    validators={["required"]}
                                    errorMessages={["Campo Obligatorio"]}
                                >
                                    {this.props.postulante.estatuspostulante.descripcion}
                                    {EstPost}
                                </SelectValidator>
                            </div>
                            <div  style={{marginRight:30}} align="center">
                                <SelectValidator
                                    className="seleccion"
                                    style={{ width: 250 }}
                                    label="Perfil"
                                    name="id_perfil"
                                    value={this.state.id_perfil}
                                    onChange={this.handlePerfil}
                                    validators={["required"]}
                                    errorMessages={["Campo Obligatorio"]}
                                >
                                    {this.props.postulante.perfil.descripcion}
                                    {perfiles}
                                </SelectValidator>
                            </div>
                            <div style={{marginRight:30}} align="right">
                                <label align="left">
                                    Comentarios:
                                    <textarea
                                        class="textArea form-control"
                                        rows="3"
                                        cols="50"
                                        name="comentarios"
                                        onChange={this.handleWrite}
                                        defaultValue={this.props.postulante.observaciones}/>
                                </label>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div style={{marginRight:30}} align="left">
                                Fecha de Nacimiento
                                <br/>
                                <TextValidator
                                    style={{marginLeft: 20, width:250}}
                                    type="date"
                                    onChange={this.handleChangeDate}
                                    name="fecha_nacimiento"
                                    value={this.state.fecha_nacimiento}
                                    validators={["required"]}
                                    errorMessages={["Campo Obligatorio"]}
                                />
                            </div>
                            <div  style={{marginRight:30}} align="center">
                                <TextValidator
                                    style={{ marginLeft: 20, width: 150 }}
                                    label="Edad"
                                    onChange={this.handleWrite}
                                    name="edad"
                                    value={this.state.edad}
                                    validators={["required", "formatoNumeros"]}
                                    errorMessages={[
                                    "Campo Obligatorio",
                                    "Ingrese solo Numeros"
                                    ]}
                                />
                            </div>
                            <div style={{marginRight:30}} align="right">
                                <SelectValidator
                                    className="seleccion"
                                    style={{ width: 150 , marginLeft:22}}
                                    label="Sexo"
                                    name="id_sexo"
                                    value={this.state.id_sexo}
                                    onChange={this.handleSexo}
                                    validators={["required"]}
                                    errorMessages={["Campo Obligatorio"]}
                                >
                                    {sexos}
                                </SelectValidator>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div style={{marginRight:30}} align="left">
                                <TextValidator
                                    style={{marginLeft: 20, width:250}}
                                    label="CURP"
                                    onChange={this.handleWrite}
                                    name="curp"
                                    value={this.state.curp}
                                    validators={["required", "Curp", "Mayusculas"]}
                                    errorMessages={["Campo Obligatorio",  
                                    "Deben ser 18 caracteres",
                                "Solo se Permiten Mayusculas"]}
                                />
                            </div>
                            <div style={{marginRight:30}} align="center">
                                <TextValidator
                                    style={{marginLeft: 20, width:250}}
                                    label="RFC"
                                    onChange={this.handleWrite}
                                    name="rfc"
                                    value={this.state.rfc}
                                    validators={["required", "Rfc", "Mayusculas"]}
                                    errorMessages={["Campo Obligatorio",  
                                    "Deben ser 13 caracteres maximo",
                                    "Solo se Permiten Mayusculas"]}
                                />
                            </div>
                            <div  style={{marginRight:30}} align="right">
                                <SelectValidator
                                    className="seleccion"
                                    style={{ width: 250 , marginLeft:22}}
                                    label="Estatus Aprobacion"
                                    name="id_estatus_aprobacion"
                                    value={this.state.id_estatus_aprobacion}
                                    onChange={this.handleSelectEstatusAprobacion}
                                    validators={["required"]}
                                    errorMessages={["Campo Obligatorio"]}
                                >
                                    {EstatusAprobaciones}
                                </SelectValidator>
                            </div>
                        </div>
                        <br/>
                        
                    </div>
                    <div className="row" style={{width:1000, marginLeft: 70}}>
                            <div className="" align="center">
                                <td className="lineaEspacioDerecha">
                                    <ColoredLine color="blue" />
                                </td>
                                <td>
                                    <h2>Datos Academicos</h2>
                                </td>
                                <td className="lineaEspacioIzquierda">
                                    <ColoredLine color="blue" />
                                </td>
                            </div>
                        </div>
                        <br />  
                    <div className="container">
                        <div className="row">
                            <div style={{marginRight:55}} align="left">
                                <Autocompletado
                                    valores={this.state.escuelas} 
                                    valor={this.state.escuel}
                                    etiqueta="Escuela"
                                    nombre="id_escuela"
                                />
                            </div>
                            <div style={{marginRight:55}} align="center">
                                <Autocompletado 
                                    valores={this.state.carrera} 
                                    valor={this.state.carr} 
                                    etiqueta="Carrera"
                                    nombre="id_carrera"
                                />
                            </div>
                            <div  style={{marginRight:55}} align="right">
                                <SelectValidator
                                    className="seleccion"
                                    style={{ width: 250 , marginLeft:22}}
                                    label="Estatus Titulacion"
                                    name="id_estatus_titulacion"
                                    value={this.state.id_estatus_titulacion}
                                    onChange={this.handleSelectEstatusTitulacion}
                                    validators={["required"]}
                                    errorMessages={["Campo Obligatorio"]}
                                >
                                    {EstTit}
                                </SelectValidator>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div  style={{marginRight:55}} align="left">
                                <TextValidator
                                    style={{marginLeft: 20, width:250}}
                                    label="Certificaciones"
                                    onChange={this.handleWrite}
                                    name="certificaciones"
                                    value={this.state.certificaciones}
                                    validators={["required"]}
                                    errorMessages={["Campo Obligatorio"]}
                                />
                            </div>
                            <div style={{marginRight:55}} align="center">
                                <TextValidator
                                    style={{marginLeft: 20, width:250}}
                                    label="Experiencia"
                                    onChange={this.handleWrite}
                                    name="experiencia"
                                    value={this.state.experiencia}
                                    validators={["required"]}
                                    errorMessages={["Campo Obligatorio"]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{width:1000, marginLeft: 70}}>
                        <div className="" align="center">
                            <td className="lineaEspacioDerecha">
                                <ColoredLine color="blue" />
                            </td>
                            <td>
                                <h2>Datos Economicos</h2>
                            </td>
                            <td className="lineaEspacioIzquierda">
                                <ColoredLine color="blue" />
                            </td>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div style={{marginRight:55}} align="left">
                                <TextValidator
                                    style={{marginLeft: 20, width:250}}
                                    label="Pretencion Economica"
                                    onChange={this.handleWrite}
                                    name="pretencion_economica"
                                    value={this.state.pretencion_economica}
                                    validators={["required", "formatoNumeros"]}
                                    errorMessages={["Campo Obligatorio", "Ingrese solo Numeros"]}
                                />
                            </div>
                            <div style={{marginRight:55}} align="center">
                                <TextValidator
                                    style={{marginLeft: 20, width:250}}
                                    label="Acuerdo Economico"
                                    onChange={this.handleWrite}
                                    name="acuerdo_economico"
                                    value={this.state.acuerdo_economico}
                                    validators={["required", "formatoNumeros"]}
                                    errorMessages={["Campo Obligatorio", "Ingrese Solo Numeros"]}
                                />
                            </div>
                            <div  style={{marginRight:55}} align="right">
                                <SelectValidator
                                    className="seleccion"
                                    style={{ width: 250 , marginLeft:22}}
                                    label="Estatus CV"
                                    name="id_estatus_cv"
                                    value={this.state.id_estatus_cv}
                                    onChange={this.handleSelectEstatusCV}
                                    validators={["required"]}
                                    errorMessages={["Campo Obligatorio"]}
                                >
                                    {CV}
                                </SelectValidator>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="container">
                        <div className="row" align="center">
                            <div >
                                <button
                                    className="btn btn-primary"
                                    type="Submit"
                                    style={{marginLeft:425,
                                    marginRight:100}}
                                >
                                    Guardar
                                </button>
                            </div>
                            <div >
                                <Link to="/consultar-Postulantes" 
                                    className="btn btn-secondary"
                                >
                                    Cancelar
                                </Link>
                            </div>
                            <br/>
                        </div>
                    </div>
                </ValidatorForm>

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

const mapDispatchToProps=dispatch=>({
    dispatchSetPostulante: value=>dispatch(setPostulante(value)),
    dispatchSetPostulanteC: value=>dispatch(setPostulanteC(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Postulante);