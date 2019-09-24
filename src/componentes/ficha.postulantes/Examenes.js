import React from 'react';
import { TableHead,TableBody,Table } from '@material-ui/core';

import TableCell from '@material-ui/core/TableCell';

export default class Citas extends React.Component{
    render(){
        return(
            <div>
                <Table>
                    <TableHead>
                        <TableCell>Tipo de Examen</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Calificación  Global</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Entrevistador</TableCell>
                        <TableCell>Observaciones</TableCell>
                    </TableHead>
                    <TableBody></TableBody>
                </Table>
            </div>
        )
    }
}