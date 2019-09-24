import React from 'react';
import { Typography } from '@material-ui/core';
import { getPostulanteC } from '../../request/request';
import '../../App.css';

export default class Datos extends React.Component {
    state ={
        resp:[]
    }
    componentWillMount = () => {
        getPostulanteC(1).then(response =>{
            let nuevoGet = [];
            console.log(response); 
            nuevoGet.push(response)
            this.setState({resp:nuevoGet})
        }).catch(console.log)
    }
    render() {
        const dato = this.state.resp.map((datos) => {
            return(
                <div>
                    <Typography><b id="div">Fecha de Nacimiento: </b>{datos.fecha_nacimiento}</Typography>
                    <Typography><b id="div">Edad: </b>{datos.edad}</Typography>
                    <Typography><b id="div">Sexo: </b>{datos.sexo.descripcion}</Typography>
                    <Typography><b id="div">CURP: </b>{datos.curp}</Typography>
                    <Typography><b id="div">RFC: </b>{datos.rfc}</Typography>
                    <Typography><b id="div">Escuela: </b>{datos.escuela.descripcion}</Typography>
                    <Typography><b id="div">Carrera: </b>{datos.carrera.descripcion}</Typography>
                    <Typography><b id="div">Estatus Titulación: </b>{datos.estatustitulacion.descripcion}</Typography>
                    <Typography><b id="div">Certificaciones: </b>{datos.certificaciones}</Typography>
                    <Typography><b id="div">Pretencion Economica Mensual: </b>{datos.pretencion_economica}</Typography>
                    <Typography><b id="div">Acuerdo Economico Mensual: </b>{datos.acuerdo_economico}</Typography>
                    <Typography><b id="div">Estatus CV: </b>{datos.estatuscv.descripcion}</Typography>
                    <Typography><b id="div">Estatus Postulante: </b>{datos.postulanteb.estatuspostulante.descripcion}</Typography>
                </div>
            )
        })
        return (
            <div>
                {dato}
            </div>
        )
    }
}