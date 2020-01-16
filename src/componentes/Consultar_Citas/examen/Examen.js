//LIBRERIAS
import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator'
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

//RUTAS
import IconoExamen from "../../../Imagenes/examen.png";

import Seccion from "../examen/seccion";
import {getTipoExamen} from "../../../request/request"
import {postExamen} from '../../../request/request'
import {setExamen, setCita, setPostulante, setSeccion, changeValor} from '../../../actions/postulanteB'


const ColoredLine = ({ color }) => (
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
const date=anio+"-"+mes+"-"+dia

class Examen extends React.Component {
    state=
    {
        idTipoExamen:"",
        tiposExamen:[],
        examen:
        {
            calificacion_global:"",
            entrevistador:this.props.cita.entrevistador,
            observaciones:"",
            usuario_actualiza:this.props.usuario.displayName,
            fecha_actualizacion:date
        }
    };

    componentWillMount=()=>
    {
        this.getTipoExamen()
        ValidatorForm.addValidationRule("formatoNumeros", string =>
      /^[0-9 .,-]*$/.test(string)
    );
    }

    getTipoExamen= async () =>
    {
    const nuevoGet= await getTipoExamen(this.props.auth)
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
                    this.state.idTipoExamen, this.props.auth).then(response=>
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
            this.state.idTipoExamen, this.props.auth).then(response=>
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
        var i
        var tipoExamen=[]
        for(i=0; i<this.state.tiposExamen.length; i++)
        {
            tipoExamen[i]=<option value={this.state.tiposExamen[i].id_tipo_examen} key={this.state.tiposExamen[i].id_tipo_examen}>
                {this.state.tiposExamen[i].descripcion}</option>
        }
        /*const tipoExamen=this.state.tiposExamen.map(te=>
            {
                return <option value={te.id_tipo_examen}>{te.descripcion}</option>
            })*/
        return (
            <React.Fragment>
                <br/>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <ColoredLine color="black" />
                    </Grid>
                    <Grid item>
                        <img className="agci" src={IconoExamen} alt="Examen" />
                    </Grid>
                    <Grid item>
                        <ColoredLine color="black" />
                    </Grid>
                </Grid>
        
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
                            <div align="center" >
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
                                                    <textarea className="textArea form-control"
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
        cita: state.cita,
        usuario: state.usuario,
        auth: state.auth
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