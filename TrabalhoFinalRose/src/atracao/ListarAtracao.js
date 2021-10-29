import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

export default class ListarAtracao extends Component {

    render() {

        return <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>VALOR</TableCell>
                    <TableCell>DURACÃO</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.listarAtracao.map(
                    (atracao) => <TableRow key={atracao.id}> 
                         <TableCell>{atracao.id}</TableCell>
                        <TableCell>{atracao.nome}</TableCell>
                        <TableCell>{atracao.valor}</TableCell>
                        <TableCell>{atracao.duracao}</TableCell>
                        
                        <TableCell>

                            <Button onClick={() => this.props.onExcluirAtracao(atracao)} color="primary">
                                Excluir
                            </Button>
                            <Button onClick={() => this.props.onEditar(atracao)} color="secondary">
                                Editar
                           </Button>
                        </TableCell>
                    </TableRow>
                )}


            </TableBody>
        </Table>;
    }
}