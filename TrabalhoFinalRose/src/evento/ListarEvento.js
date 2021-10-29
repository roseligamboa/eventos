import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

export default class ListarEvento extends Component {

    render() {

        return <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>NOME DO EVENTO</TableCell>
                    <TableCell>LOCAL</TableCell>
                    <TableCell>DATA DO EVENTO</TableCell>
                    <TableCell>ATRAÇÃO</TableCell>
                    <TableCell>CLIENTE</TableCell>
                    <TableCell>PROMOTER</TableCell>
                    <TableCell>AÇÃO</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.listarEvento.map(
                    (evento) => <TableRow key={evento.id}>
                        <TableCell>{evento.id}</TableCell>
                        <TableCell>{evento.nome}</TableCell>
                        <TableCell>{evento.local}</TableCell>
                        <TableCell>{evento.dataEvento}</TableCell>
                        <TableCell>{evento.atracao ? evento.atracao.nome:""}</TableCell>
                        <TableCell>{evento.cliente ? evento.cliente.nome:""}</TableCell>
                        <TableCell>{evento.promoter ? evento.promoter.nome:""}</TableCell>

                        <TableCell>
                            <Button onClick={() => this.props.onExcluir(evento)}color="primary">
                            Excluir
                            </Button>
                            <Button onClick={() => this.props.onEditar(evento)}color="secondary">    
                           Editar
                           </Button>           
                        </TableCell>

                        </TableRow>
                )}


            </TableBody>
        </Table>;
    }
}