import React from 'react';
import { TableHead,TableBody,Table,TableCell,TableRow } from '@material-ui/core';
import {getPostulanteC} from '../../request/request';

export default class Citas extends React.Component{
    state ={
        resp:[]
    }
    componentWillMount = () => {
        getPostulanteC(2).then(response =>{
            let nuevoGet = [];
            nuevoGet.push(response)
            this.setState({resp:nuevoGet})
        }).catch(console.log)
    }
    render(){
        const citas = this.state.resp.map((datos)=>{
            return datos.postulanteb.cita.map((date)=>{
                return(
                    <div>
                        <TableRow>
                            <TableCell>{datos.postulanteb.nombre}</TableCell>
                        </TableRow>
                    </div>
                )
            })
        })
        const citas1 = this.state.resp.map((datos)=>{
            return datos.postulanteb.cita.map((date)=>{
                return(
                    <div>
                        <TableRow>
                            <TableCell>{datos.postulanteb.apellido1}</TableCell>
                        </TableRow>
                    </div>
                )
            })
        })
        const citas2 = this.state.resp.map((datos)=>{
            return datos.postulanteb.cita.map((date)=>{
                return(
                    <div>
                        <TableRow>
                            <TableCell>{datos.postulanteb.apellido2}</TableCell>
                        </TableRow>
                    </div>
                )
            })
        })
        const citas3 = this.state.resp.map((datos)=>{
            return datos.postulanteb.cita.map((date)=>{
                return(
                    <div>
                        <TableRow>
                            <TableCell>{date.fecha}</TableCell>
                        </TableRow>
                    </div>
                )
            })
        })
        const citas4 = this.state.resp.map((datos)=>{
            return datos.postulanteb.cita.map((date)=>{
                return(
                    <div>
                        <TableRow>
                            <TableCell>{date.hora}</TableCell>
                        </TableRow>
                    </div>
                )
            })
        })
        const citas5 = this.state.resp.map((datos)=>{
            return datos.postulanteb.cita.map((date)=>{
                return(
                    <div>
                        <TableRow>
                            <TableCell>{date.entrevistador}</TableCell>
                        </TableRow>
                    </div>
                )
            })
        })
        const citas6 = this.state.resp.map((datos)=>{
            return datos.postulanteb.cita.map((date)=>{
                return(
                    <div>
                        <TableRow>
                            <TableCell>{date.observaciones}</TableCell>
                        </TableRow>
                    </div>
                )
            })
        })
        const citas7 = this.state.resp.map((datos)=>{
            return datos.postulanteb.cita.map((date)=>{
                return(
                    <div>
                        <TableRow>
                            <TableCell>{date.estatuscita.descripcion}</TableCell>
                        </TableRow>
                    </div>
                )
            })
        })
        return(
            <div>
                <Table>
                        <TableHead  style={{background:"#b4e5f7"}}>
                            <TableCell style={{fontSize:"12px"}}>Nombre</TableCell>
                            <TableCell style={{fontSize:"12px"}}>Apellido Paterno</TableCell>
                            <TableCell style={{fontSize:"12px"}}>Apellido Materno</TableCell>
                            <TableCell style={{fontSize:"12px"}}>Fecha</TableCell>
                            <TableCell style={{fontSize:"12px"}}>Hora</TableCell>
                            <TableCell style={{fontSize:"12px"}}>Entrevistador</TableCell>
                            <TableCell style={{fontSize:"12px"}}>Observaciones</TableCell>
                            <TableCell style={{fontSize:"12px"}}>Asistió</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableCell style={{fontSize:"10px"}}>{citas}</TableCell>
                            <TableCell style={{fontSize:"10px"}}>{citas1}</TableCell>
                            <TableCell style={{fontSize:"10px"}}>{citas2}</TableCell>
                            <TableCell style={{fontSize:"10px"}}>{citas3}</TableCell>
                            <TableCell style={{fontSize:"10px"}}>{citas4}</TableCell>
                            <TableCell style={{fontSize:"10px"}}>{citas5}</TableCell>
                            <TableCell style={{fontSize:"10px"}}>{citas6}</TableCell>
                            <TableCell style={{fontSize:"10px"}}>{citas7}</TableCell>
                        </TableBody>
                    </Table>
            </div>
        )
    }
}

