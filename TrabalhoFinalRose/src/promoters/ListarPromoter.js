import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';


export default class ListarPromoter extends Component {

    render() {

        return <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Login</TableCell>
                    <TableCell>Permissao</TableCell>
                    
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.listarPromoter.map(
                    (promoter) => <TableRow key={promoter.id}>
                        <TableCell>{promoter.id}</TableCell>
                        <TableCell>{promoter.nome}</TableCell>
                        <TableCell>{promoter.login}</TableCell>
                        <TableCell>{promoter.permissao}</TableCell>
                        <TableCell style={{ border: "none" }}>
                            <Button onClick={() => this.props.onExcluirPromoter(promoter)} color="primary">
                                excluir
                            </Button>
                            <Button onClick={() => this.props.onEditar(promoter)} color="secondary">
                                editar
                            </Button>
                            </TableCell>
                    </TableRow>
                )}


            </TableBody>
        </Table>;
    }
}