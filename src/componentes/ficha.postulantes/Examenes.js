import React from 'react';
import { TableHead, TableBody, Table, TableRow, TableCell } from '@material-ui/core';

import { getPostulanteC } from '../../request/request';

export default class Citas extends React.Component {
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
        const examenes = this.state.resp.map((datos) => {
            return datos.postulanteb.cita.map((date) => {
                return date.examen.map((exa) => {
                    return (
                        <div>
                            <TableRow>
                                <TableCell>{exa.tipoexamen.examen_tipo}</TableCell>
                            </TableRow>
                        </div>
                    )
                })
            })
        })
        const examenes1 = this.state.resp.map((datos) => {
            return datos.postulanteb.cita.map((date) => {
                return date.examen.map((exa) => {
                    return (
                        <div>
                            <TableRow>
                                <TableCell>{exa.tipoexamen.descripcion}</TableCell>
                            </TableRow>
                        </div>
                    )
                })
            })
        })
        const examenes2 = this.state.resp.map((datos) => {
            return datos.postulanteb.cita.map((date) => {
                return date.examen.map((exa) => {
                    return (
                        <div>
                            <TableRow>
                                <TableCell>{exa.calificacion_global}</TableCell>
                            </TableRow>
                        </div>
                    )
                })
            })
        })
        const examenes3 = this.state.resp.map((datos) => {
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
        const examenes4 = this.state.resp.map((datos) => {
            return datos.postulanteb.cita.map((date) => {
                return (
                    <div>
                        <TableRow>
                            <TableCell>{date.entrevistador}</TableCell>
                        </TableRow>
                    </div>
                )
            })
        })
        const examenes5 = this.state.resp.map((datos) => {
            return datos.postulanteb.cita.map((date) => {
                return (
                    <div>
                        <TableRow>
                            <TableCell>{date.observaciones}</TableCell>
                        </TableRow>
                    </div>
                )
            })
        })
        return (
            <div>
                <Table>
                    <TableHead style={{ background: "#b4e5f7" }}>
                        <TableCell>Tipo de Examen</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Calificación  Global</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Entrevistador</TableCell>
                        <TableCell>Observaciones</TableCell>
                    </TableHead>
                    <TableBody>
                        <TableCell style={{ fontSize: "10px" }}>{examenes}</TableCell>
                        <TableCell style={{ fontSize: "10px" }}>{examenes1}</TableCell>
                        <TableCell style={{ fontSize: "10px" }}>{examenes2}</TableCell>
                        <TableCell style={{ fontSize: "10px" }}>{examenes3}</TableCell>
                        <TableCell style={{ fontSize: "10px" }}>{examenes4}</TableCell>
                        <TableCell style={{ fontSize: "10px" }}>{examenes5}</TableCell>
                    </TableBody>
                </Table>
            </div>
        )
    }
}