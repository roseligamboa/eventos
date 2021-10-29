import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

export default class ListarClientes extends Component {

    render() {

        return <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>NOME</TableCell>
                    <TableCell>TELEFONE</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.listarCliente.map(
                    (cliente) => <TableRow key={cliente.id}> 
                         <TableCell>{cliente.id}</TableCell>
                        <TableCell>{cliente.nome}</TableCell>
                        <TableCell>{cliente.telefone}</TableCell>
                        <TableCell>

                            <Button onClick={() => this.props.onExcluirCliente(cliente)} color="primary">
                                Excluir
                            </Button>
                            <Button onClick={() => this.props.onEditar(cliente)} color="secondary">
                                Editar
                           </Button>
                        </TableCell>
                    </TableRow>
                )}


            </TableBody>
        </Table>;
    }
}