import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class Atracao extends Component {
    constructor(props) {
        super(props);
        if (this.props.editar) {
            this.state = {
                id: this.props.editar.id,
                nome: this.props.editar.nome,
                valor: this.props.editar.valor,
                duracao: this.props.editar.duracao,
            }
        } else {
            this.state = {
                nome: "",
                valor: "",
                duracao: "",
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
                valor: this.state.valor,
                duracao: this.state.duracao,
            })

        } else {
            this.props.onAdicionarAtracao({
                nome: this.state.nome,
                valor: this.state.valor,
                duracao: this.state.duracao,
            });
        }
        this.setState({
            id: "",
            nome: "",
            valor: "",
            duracao: "",
        });
    }
    render() {
        return (
            <Dialog
                open={true}
            >
                <DialogTitle>{this.state.id ?
                    <h3> Editar Atracao {this.state.nome}  </h3> :
                    <h3>Cadastrar Atracao</h3>}</DialogTitle>
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
                        type="number"
                        label="Valor"
                        fullWidth
                        value={this.state.valor}
                        onChange={(evento) => this.setParam('valor', evento.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        type="number"
                        label="Duracao"
                        fullWidth
                        value={this.state.duracao}
                        onChange={(evento) => this.setParam('duracao', evento.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.enviar()} color="primary">
                        {this.state.id ? "Confirmar" : "Adicionar"}
                    </Button>
                    <Button onClick={() => {this.props.onCancelar() }} color="secondary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}