import React from 'react';
import { TableHead, TableBody, Table, TableCell, TableRow } from '@material-ui/core';
import { getPostulanteC } from '../../request/request';
import Checkbox from '@material-ui/core/Checkbox';

export default class Entrevistas extends React.Component {
    state = {
        resp: []
    }
    componentWillMount = () => {
        getPostulanteC(2).then(response => {
            let nuevoGet = [];
            nuevoGet.push(response)
            this.setState({ resp: nuevoGet })
        }).catch(console.log)
    }
    render() {
        const entrevista = this.state.resp.map((datos) => {
            return datos.postulanteb.cita.map((date) => {
                return date.seccion.map((entre) => {
                    return (
                        <div>
                            <TableRow>
                                <TableCell>{entre.tipoentrevista.descripcion}</TableCell>
                            </TableRow>
                        </div>
                    )
                })
            })
        })
        const entrevista1 = this.state.resp.map((datos) => {
            return datos.postulanteb.cita.map((date) => {
                return date.seccion.map((entre) => {
                    return (
                        <div>
                            <TableRow>
                                <TableCell>{date.fecha}</TableCell>
                            </TableRow>
                        </div>
                    )
                })
            })
        })
        const entrevista2 = this.state.resp.map((datos) => {
            return datos.postulanteb.cita.map((date) => {
                return date.seccion.map((entre) => {
                    return (
                        <div>
                            <TableRow>
                                <TableCell>{date.hora}</TableCell>
                            </TableRow>
                        </div>
                    )
                })
            })
        })
        const entrevista3 = this.state.resp.map((datos) => {
            return datos.postulanteb.cita.map((date) => {
                return date.seccion.map((entre) => {
                    return (
                        <div>
                            <TableRow>
                                <TableCell>{date.entrevistador}</TableCell>
                            </TableRow>
                        </div>
                    )
                })
            })
        })
        const entrevista4 = this.state.resp.map((datos) => {
            return datos.postulanteb.cita.map((date) => {
                return date.seccion.map((entre) => {
                    return (
                        <div>
                            <TableRow>
                                <TableCell>{entre.cliente.descripcion}</TableCell>
                            </TableRow>
                        </div>
                    )
                })
            })
        })
        const entrevista5 = this.state.resp.map((datos) => {
            return datos.postulanteb.cita.map((date) => {
                return date.seccion.map((entre) => {
                    return (
                        <div>
                            <TableRow>
                                <TableCell>{date.observaciones}</TableCell>
                            </TableRow>
                        </div>
                    )
                })
            })
        })
        return (
            <div>
                <Table>
                    <TableHead style={{background:"#b4e5f7"}}>
                        <TableCell>Tipo de Entrevista</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Hora</TableCell>
                        <TableCell>Entrevistador</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Observaciones</TableCell>
                    </TableHead>
                    <TableBody>
                            <TableCell style={{fontSize:"10px"}}>{entrevista}</TableCell>
                            <TableCell style={{fontSize:"10px"}}>{entrevista1}</TableCell>
                            <TableCell style={{fontSize:"10px"}}>{entrevista2}</TableCell>
                            <TableCell style={{fontSize:"10px"}}>{entrevista3}</TableCell>
                            <TableCell style={{fontSize:"10px"}}>{entrevista4}</TableCell>
                            <TableCell style={{fontSize:"10px"}}>{entrevista5}</TableCell>
                    </TableBody>
                </Table>
            </div>
        )
    }
}