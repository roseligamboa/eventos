import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class Clientes extends Component {
    constructor(props) {
        super(props);
        if (this.props.editar) {
            this.state = {
                id: this.props.editar.id,
                nome: this.props.editar.nome,
                telefone: this.props.editar.telefone, 
            }
        } else {
            this.state = {
                nome: "",
                telefone: "",
            }
        }

    }
    setParam(param, valor) {
        this.setState({
            [param]: valor
        });
    }
    enviar() {
        if (this.state.id) {
            this.props.onEditar({
                id: this.state.id,
                nome: this.state.nome,
                telefone: this.state.telefone,  
            })

        } else {
            this.props.onAdicionarCliente({
                nome: this.state.nome,
                telefone: this.state.telefone,
            });
        }
        this.setState({
            id: "",
            nome: "",
            telefone: "", 
        });
    }
    render() {
        return (
            <Dialog
                open={true}
            >
                <DialogTitle>{this.state.id ?
                    <h3> Editar Cliente {this.state.nome}  </h3> :
                    <h3>Cadastrar Cliente</h3>}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome"
                        fullWidth
                        value={this.state.nome}
                        onChange={(evento) => this.setParam('nome', evento.target.value)}
                    />
                     <TextField
                        autoFocus
                        margin="dense"
                        label="Telefone"
                        fullWidth
                        value={this.state.telefone}
                        onChange={(evento) => this.setParam('telefone', evento.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.enviar()} color="primary">
                        {this.state.id ? "Confirmar" : "Adicionar"}
                    </Button>
                    <Button onClick={() => { this.props.onCancelar()}} color="secondary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}