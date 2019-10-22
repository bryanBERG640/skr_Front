import React from "react";
import IconoExamen from "../../Imagenes/examen.png";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import Seccion from "../examen/seccion";
import {getTipoExamen} from "../../request/request"
import { number } from "prop-types";

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
        idTipoExamen:number,
        tiposExamen:[],
        examen:
        {
            calificacion_global:number,
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
    }

    getTipoExamen= async () =>
    {
    const nuevoGet= await getTipoExamen()
    this.setState({tiposExamen:nuevoGet.data})
    }

    handleSelect=e=>
    {
        this.state.tiposExamen.map(te=>
        {
            if(e.target.value===te.descripcion)
            {
                this.setState({idTipoExamen:te.id_tipo_examen})
            }
            return te.id_tipo_examen
        })
    }

    handleChange=e=>
    {
        let exa=this.state.examen

        if(e.target.name==="calificacion_global")
        {
            let cg=parseInt(e.target.value)
            exa.calificacion_global=cg
            this.setState({examen:exa})
        }
        if(e.target.name==="observaciones")
        {
            exa.observaciones=e.target.value
            this.setState({examen:exa})
        }
    }

    handleClick=e=>
    {
        
    }

    render() {
        console.log(this.state.examen)
        const tipoExamen=this.state.tiposExamen.map(te=>
            {
                return <option value={te.descripcion}>{te.descripcion}</option>
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
                    <form>
                        <div className="form">
                            <div className="marginBotton" align="center">
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
                                                    <label>Tipo de exámen:</label>
                                                </div>
                                                <div className="col-sm-12">
                                                    <select className="form-control labelBorder" 
                                                    required name="tipoExamen"
                                                    onClick={this.handleSelect}>
                                                        <option>Selecciona</option>
                                                        {tipoExamen}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-sm-3">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <label>Calificación global:</label>
                                                </div>
                                                <div className="col-sm-12">
                                                    <input className="form-control labelBorder" 
                                                    type="text"
                                                    name="calificacion_global"
                                                    value={this.state.value}
                                                    onChange={this.handleChange}/>
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
                                <form>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-5 left">
                                                {/* <Link to="/consultarCita" className="btn btn-primary" >Guardar</Link> */}
                                                <button type="button" 
                                                className="btn btn-primary"
                                                onClick={this.handleClick}>Guardar</button>
                                            </div>
                                            <div className="col-2"></div>
                                            <div className="col-5 center divBoton2">
                                                <Link to="/consultarCita" className="boton2"> Salir</Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </form>
                </div>      
                <br/>
                <br/>
                <Seccion/>      
                
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

export default connect(mapStateToProps,null)(Examen);