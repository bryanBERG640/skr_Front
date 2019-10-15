import React from 'react';
import { TableHead, TableBody, Table, TableRow, TableCell, Paper } from '@material-ui/core';
import { getPostulanteC } from '../../request/request';
import { connect } from 'react-redux';

class Citas extends React.Component {
    state = {
        resp: []
    }
    componentWillMount = () => {
        getPostulanteC(this.props.postulantec.id_postulante_c).then(response => {
            let nuevoGet = [];
            nuevoGet.push(response)
            this.setState({ resp: nuevoGet })
        }).catch(console.log)
    }
    render() {
        const cliente = this.state.resp.map((datos) => {
            return datos.postulanteb.cita.map((date) => {
                return date.examen.map((exa) => {
                    return date.seccion.map((entre) => {
                        return (
                            <TableCell style={{ fontSize: "10px" }}>{entre.cliente.descripcion}</TableCell>
                        )
                    })
                })
            })
        })
        const examenes = this.state.resp.map((datos) => {
            return datos.postulanteb.cita.map((date) => {
                return date.examen.map((exa) => {
                    return date.seccion.map((entre) => {
                        console.log(entre);
                        console.log(exa);
                        return (
                            <TableRow>
                                <TableCell style={{ fontSize: "12px" }}>{exa.tipoexamen.examen_tipo}</TableCell>
                                <TableCell style={{ fontSize: "12px" }}>{exa.tipoexamen.descripcion}</TableCell>
                                <TableCell style={{ fontSize: "12px" }}>{exa.calificacion_global}</TableCell>
                                <TableCell style={{ fontSize: "12px" }}>{entre.cliente.descricion}</TableCell>
                                <TableCell style={{ fontSize: "12px" }}>{date.entrevistador}</TableCell>
                                <TableCell style={{ fontSize: "12px" }}>{date.observaciones}</TableCell>
                            </TableRow>
                        )
                    })
                })
            })
        })
        return (
            <div>
                <Paper>
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
                            {examenes}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

//Se accede al store postulantec.
const mapStateToProps = state => {
    return {
        postulantec: state.postulantec
    };
};

export default connect(mapStateToProps, null)(Citas);