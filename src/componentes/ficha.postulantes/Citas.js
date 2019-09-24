import React from 'react';
import { TableHead,TableBody,Table } from '@material-ui/core';

import TableCell from '@material-ui/core/TableCell';

export default class Citas extends React.Component{
    render(){
        return(
            <div>
                <Table>
                    <TableHead>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Apellido Paterno</TableCell>
                        <TableCell>Apellido Materno</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Hora</TableCell>
                        <TableCell>Entrevistador</TableCell>
                        <TableCell>Observaciones</TableCell>
                        <TableCell>Asistió</TableCell>
                    </TableHead>
                    <TableBody></TableBody>
                </Table>
            </div>
        )
    }
}

