import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class ListaPesquisaCliente extends Component {

    render() {

        return <Table >
            <TableHead>
                <TableRow>
                    <TableCell>NOME</TableCell>
                    <TableCell>TELEFONE</TableCell>                    
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.listarCliente.map(
                    (cliente) => <TableRow key={cliente.nome}> 
                        <TableCell>{cliente.nome}</TableCell>
                        <TableCell>{cliente.telefone}</TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                )}


            </TableBody>
        </Table>;
    }
}