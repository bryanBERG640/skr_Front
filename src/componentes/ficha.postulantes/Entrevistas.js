import React from 'react';
import { TableHead,TableBody,Table } from '@material-ui/core';

import TableCell from '@material-ui/core/TableCell';

export default class Entrevistas extends React.Component{
    render(){
        return(
            <div>
                <Table>
                    <TableHead>
                        <TableCell>Tipo de Entrevista</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Hora</TableCell>
                        <TableCell>Entrevistador</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Observaciones</TableCell>
                    </TableHead>
                    <TableBody></TableBody>
                </Table>
            </div>
        )
    }
}