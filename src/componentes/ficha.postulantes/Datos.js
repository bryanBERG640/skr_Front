import React from 'react';
import { Typography } from '@material-ui/core';
import { getPostulanteC } from '../../request/request';

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
                    <Typography>Fecha de Nacimiento: {datos.fecha_nacimiento}</Typography>
                    <Typography>Edad: {datos.edad}</Typography>
                    <Typography>Sexo: {datos.sexo.descripcion}</Typography>
                    <Typography>CURP: {datos.curp}</Typography>
                    <Typography>RFC: {datos.rfc}</Typography>
                    <Typography>Escuela: {datos.escuela.descripcion}</Typography>
                    <Typography>Carrera: {datos.carrera.descripcion}</Typography>
                    <Typography>Estatus Titulación: datos.estatus_titulacion.descripcion</Typography>
                    <Typography>Certificaciones: {datos.certificaciones}</Typography>
                    <Typography>Pretencion Economica Mensual: {datos.pretencion_economica}</Typography>
                    <Typography>Acuerdo Economico Mensual: {datos.acuerdo_economico}</Typography>
                    <Typography>Estatus CV: {datos.estatus_cv.descripcion}</Typography>
                    <Typography>Estatus Postulante: {datos.estatus_postulante.descripcion}</Typography>
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