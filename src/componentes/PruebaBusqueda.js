import React from "react";
import { getPrueba } from "../request/request";
import { TableHead, TableBody, Table, TableCell, TableRow, Container, Button } from "@material-ui/core";

import TextField from '@material-ui/core/TextField';

export default class PruebaBusqueda extends React.Component {
    state = {
        resp: [],
        fecha: "",
        name: "",
        escuela: ""
    };
    componentDidMount = () => {
        getPrueba().then(response => {
            let nuevoGet = [];
            nuevoGet.push(response);
            this.setState({ resp: nuevoGet });
            console.log(this.state.resp);
        })
    }
   

    handleClick() {
    }

    handleChangeNombre = (e) => {
        this.setState({ [e.target.name]: e.target.value, })
    }

    handleChangeFecha = (e) => {
        this.setState({ [e.target.name]: e.target.value, })
    }

    handleChangeEscuela = (e) => {
        this.setState({ [e.target.name]: e.target.value, })
    }

    render() {
        
        // const consulta = this.state.resp.map((datos, i) => {
        //     return datos.map((valores) => {
        //         return valores.postulanteb.cita.map((cit, j) => {
        //             return cit.seccion.map((secc) => {
        //                 return cit.examen.map((exa) => {
        //                     return exa.seccion.map((exas) => {
        //                         if (this.state.fecha === valores.fecha_nacimiento || this.state.name === valores.postulanteb.nombre) {
        //                             return (
        //                                 <div>
        //                                     <Table>
        //                                         <TableHead style={{ background: "#f7316c" }}>
        //                                             <TableCell>Nombre</TableCell>
        //                                             <TableCell>Apellido Paterno</TableCell>
        //                                             <TableCell>Apellido Materno</TableCell>
        //                                             <TableCell>Fecha de Nacimiento</TableCell>
        //                                             <TableCell>Calificacion Global</TableCell>
        //                                             <TableCell>Tipo Examen</TableCell>
        //                                             <TableCell>Entrevistador</TableCell>
        //                                             <TableCell>Edad</TableCell>
        //                                             <TableCell>Escuela</TableCell>
        //                                         </TableHead>
        //                                         <TableBody>
        //                                             <TableCell>{valores.postulanteb.nombre}</TableCell>
        //                                             <TableCell>{valores.postulanteb.apellido1}</TableCell>
        //                                             <TableCell>{valores.postulanteb.apellido2}</TableCell>
        //                                             <TableCell>{valores.fecha_nacimiento}</TableCell>
        //                                         </TableBody>
        //                                     </Table>
        //                                 </div>
        //                             )
        //                         }
        //                     })
        //                 })
        //             })
        //         })
        //     })
        // })
        return (
            <div>
                <Container>
                    <tr>
                        <td>
                            <TextField label="Nombre"
                                onChange={this.handleChangeNombre}
                                name="name"
                                valiue={this.state.name} />
                        </td>
                        <td>
                            <TextField label="Fecha"
                                onChange={this.handleChangeFecha}
                                name="fecha"
                                valiue={this.state.fecha} />
                        </td>
                        <td>
                            <TextField label="Escuela"
                                onChange={this.handleChangeEscuela}
                                name="escuela"
                                valiue={this.state.escuela} />
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <Button style={{ background: "#f2d10a" }}>Buscar</Button>
                    </tr>
                </Container>
                <br />
                <Container>
                    {/* <Table>
                        <TableHead style={{ background: "#f7316c" }}>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido Paterno</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Hora</TableCell>
                            <TableCell>Calificacion Global</TableCell>
                            <TableCell>Tipo Examen</TableCell>
                            <TableCell>Entrevistador</TableCell>
                            <TableCell>Edad</TableCell>
                            <TableCell>Escuela</TableCell>
                        </TableHead>
                        <TableBody></TableBody>
                    </Table> */}
                </Container>
            </div>
        )
    }
}