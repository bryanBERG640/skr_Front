import React from "react";
import IconoExamen from "../../Imagenes/examen.png";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import Seccion from "../examen/seccion";
import {getTipoExamen} from "../../request/request"
import {postExamen} from '../../request/request'
import {setExamen, setCita, setPostulante, setSeccion, changeValor} from '../../actions/postulanteB'
import {ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator'

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: 600
        }}
    />
);


const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();
const date=anio+"-"+mes+"-"+dia

class Examen extends React.Component {
    state=
    {
        idTipoExamen:null,
        tiposExamen:[],
        examen:
        {
            calificacion_global:null,
            entrevistador:this.props.cita.entrevistador,
            observaciones:"",
            usuario_actualiza:"Bryan Ramirez",
            fecha_actualizacion:date
        }
    };
    constructor(props)
    {
        super(props)
    }

    componentWillMount=()=>
    {
        this.getTipoExamen()
        ValidatorForm.addValidationRule("formatoNumeros", string =>
      /^[0-9 .,-]*$/.test(string)
    );
    }

    getTipoExamen= async () =>
    {
    const nuevoGet= await getTipoExamen()
    this.setState({tiposExamen:nuevoGet.data})
    }

    handleSelect=e=>
    {
        this.setState({idTipoExamen:e.target.value})
    }

    handleChange=e=>
    {
        const {examen}= this.state
        examen[e.target.name]=e.target.value;
        this.setState({examen})
    }

    handleClick=e=>
    {
        if(this.state.examen.calificacion_global!==0 &&
            this.state.idTipoExamen!==0)
            {
                postExamen(this.state.examen,
                    this.props.cita.id_cita,
                    this.state.idTipoExamen).then(response=>
                        {
                            console.log(response)
                            this.props.dispatchSetExamen(response)
                        })
                        .catch(console.log)
            }
        
    }

    handleSubmit=e=>
    {
        
        if(this.state.examen.calificacion_global!==null &&
        this.state.idTipoExamen!==null)
        {
            console.log("aprobado")
            postExamen(this.state.examen,
            this.props.cita.id_cita,
            this.state.idTipoExamen).then(response=>
            {
            console.log(response)
            this.props.dispatchSetExamen(response)
            })
            .catch(console.log)

        }
    }

    handleClean=e=>
    {
        
        this.props.dispatchSetExamen("vacio")
        this.props.dispatchSetCita("vacio")
        this.props.dispatchSetPostulante("Vacio")
        this.props.dispatchSetSeccion("vacio")
        this.props.dispatchSeleccion("vacio")
        console.log("Store limpio")
    }

    render() {
        //console.log(this.state.examen.calificacion_global)
        const tipoExamen=this.state.tiposExamen.map(te=>
            {
                return <option value={te.id_tipo_examen}>{te.descripcion}</option>
            })
        return (
            <React.Fragment>
                <div align="center">
                    <td className="lineaEspacioDerecha">
                        <ColoredLine color="black" />
                    </td>
                    <td>
                        <img className="agci" src={IconoExamen} alt="Examen" />
                    </td>
                    <td className="lineaEspacioIzquierda">
                        <ColoredLine color="black" />
                    </td>
                </div>
                <div className="text-center ">
                    <TextField
                        label="Fecha Actual"
                        type="date-local"
                        defaultValue={
                            fecha.getDate() +
                            "/" +
                            (fecha.getMonth() + 1) +
                            "/" +
                            fecha.getFullYear()
                        }
                        disabled
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </div>
                <div className="center">
                    <ValidatorForm
                      onSubmit={this.handleSubmit}
                      ref="form"
                      onError={errors=>console.log(errors)}>
                        <div className="form">
                            <div npm  align="center" >
                                <div className="container">
                                    <div className="row justify-content-md-center">
                                        <h3>
                                            Entrevistador: &nbsp; &nbsp;
                                             <label className="datosCita"> {this.props.cita.entrevistador}</label>
                                        </h3>
                                    </div>
                                    <div className="row justify-content-md-center">
                                        <h4>
                                            Empresa: &nbsp; &nbsp;
                                            <label className="datosCita"> {this.props.cita.empresa.descripcion}</label>
                                        </h4>
                                    </div>
                                    <div className="row justify-content-md-center">
                                        <h4>
                                            Cliente: &nbsp; &nbsp;
                                            <label className="datosCita"> {this.props.cita.cliente.descripcion}</label>
                                        </h4>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <SelectValidator
                                                    style={{width:200}}
                                                     text-align="left"
                                                     label="Tipo de Examen" 
                                                    name="tipoExamen"
                                                    onClick={this.handleSelect}
                                                    value={this.state.idTipoExamen}
                                                    validators={["required"]}
                                                    errorMessages={["Campo Obligatorio"]}>                
                                                        {tipoExamen}
                                                    </SelectValidator>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-sm-3">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <TextValidator
                                                     label="Calificacion Global"
                                                    name="calificacion_global"
                                                    value={this.state.examen.calificacion_global}
                                                    onChange={this.handleChange}
                                                    validators={["required", "formatoNumeros"]}
                                                    errorMessages={["Campo Obligatorio", "Ingrese solo Numeros"]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="row columnTextArea">
                                                <div className="col-sm-12">
                                                    <label>Comentarios:</label>
                                                </div>
                                                <div className="col-sm-12">
                                                    <textarea class="textArea form-control"
                                                     rows="3" cols="40"
                                                     name="observaciones"
                                                     value={this.state.value}
                                                     onChange={this.handleChange}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="center">                                
                                <div className="container">
                                    <div className="row">
                                        <div className="col-2">
                                        <button className="btn btn-primary"
                                            type="submit"
                                        >
                                            Confirmar</button>
                                        </div>
                                        <div className="col-2">
                                        <Link to="/consultarCita" 
                                        className="btn btn-danger"
                                        onClick={this.handleClean}> Salir</Link>
                                        </div>                                                
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </ValidatorForm>
                </div>      
                <br/>
                <br/>
                <Seccion examen={this.state.examen}
                tipo={this.state.idTipoExamen}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps=state=>
{
    return{
        postulante: state.postulante,
        cita: state.cita
    }
}

const mapDispatchToProps=dispatch=>({
    dispatchSetExamen: value=> dispatch(setExamen(value)),
    dispatchSetCita: value=>dispatch(setCita(value)),
    dispatchSetPostulante: value=>dispatch(setPostulante(value)),
    dispatchSetSeccion: value=>dispatch(setSeccion(value)),
    dispatchSeleccion:value=>dispatch(changeValor(value))
})

export default connect(mapStateToProps,mapDispatchToProps,null)(Examen);