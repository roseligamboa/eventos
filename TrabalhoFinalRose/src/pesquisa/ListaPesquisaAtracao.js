import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class ListaPesquisaAtracao extends Component {

    render() {

        return <Table>
            <TableHead>
                <TableRow>
                    <TableCell>NOME DA ATRAÇÃO</TableCell>
                    <TableCell>VALOR</TableCell>
                    <TableCell>DURAÇÃO</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.listarAtracao.map(
                    (atracao) => <TableRow key={atracao.nome}> 
                        <TableCell>{atracao.nome}</TableCell>
                        <TableCell>{atracao.valor}</TableCell>
                        <TableCell>{atracao.duracao}</TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                )}


            </TableBody>
        </Table>;
    }
}