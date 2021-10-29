import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
export default class Evento extends Component {

    constructor(props) {
        super(props);
        if (this.props.editar) {
            this.state = {
                id: this.props.editar.id,
                nome: this.props.editar.nome,
                local: this.props.editar.local,
                dataEvento: this.props.editar.dataEvento,
                atracaoId: this.props.editar.atracao ?
                    this.props.editar.atracao.id : "",
                clienteId: this.props.editar.cliente ?
                    this.props.editar.cliente.id : "",
                promoterId: this.props.editar.promoter ?
                    this.props.editar.promoter.id : "",
            };
        }else {
            this.state = {
            nome: "",
            local:"",
        /**coloca a data como um modelo */
            dataEvento:"00/00/0000",
            atracaoId:"",
            clienteId: "", 
            promoterId: "", };
        }
        this.state.atracoes = [];
        this.state.clientes = [];
        this.state.promoters = [];
        this.state.eventos = [];
    }
    componentDidMount() {
        this.listaAtracao();
        this.listaClientes();
        this.listaPromoter();
        this.listaEventos();
    }
    listaAtracao() {
        axios.get("/api/atracoes/").then(
            (resultado) => {
                this.setState({ atracoes: resultado.data });
            }
        );
    }
    listaClientes() {
        axios.get("/api/clientes/").then(
            (resultado) => {
                this.setState({ clientes: resultado.data });
            }
        );
    }
    listaPromoter() {
        axios.get("/api/promoters/").then(
            (resultado) => {
                this.setState({ promoters: resultado.data });
            }
        );
    }
    listaEventos() {
        axios.get("/api/eventos/").then(
            (resultado) => {
                this.setState({ eventos: resultado.data });
            }
        );
    }
    setParam(param, valor) {
        this.setState({
            [param]: valor
        });
    }
    enviar() {
        let atracao  = this.state.atracoes.find(
            (atracaoNoArray) => atracaoNoArray.id === this.state.atracaoId
        );
        let cliente = this.state.clientes.find(
            (clienteNoArray) => clienteNoArray.id === this.state.clienteId
        );
        let promoter = this.state.promoters.find(
            (promoterNoArray) => promoterNoArray.id === this.state.promoterId
        );
        if (this.state.id) {
            this.props.onEditar({
                id: this.state.id,
                nome:this.state.nome,
                local: this.state.local,
                dataEvento: this.state.dataEvento,
                atracao: atracao,
                cliente:cliente,
                promoter: promoter,
            });
        } else {
            this.props.onAdicionar({
                id: this.state.id,
                nome:this.state.nome,
                local: this.state.local,
                dataEvento: this.state.dataEvento, 
                atracao:atracao,
                cliente: cliente,
                promoter:promoter,
            });

        }
        this.setState({
            local: "", 
            nome:"",
            dataEvento:"",
            atracaoId: "", 
            clienteId: "",
            promoterId: "",
        });
    }

    render() {

        return (
            <Dialog
                open={true}
            >
                <DialogTitle>{this.state.id ?
                    <h3> Editar evento de  {this.state.local}  </h3> :
                    <h3>Cadastrar evento</h3>}</DialogTitle>
               
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
                        label="Local"
                        fullWidth
                        value={this.state.local}
                        onChange={(evento) => this.setParam('local', evento.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="digite uma data para o evento"
                        fullWidth
                        value={this.state.dataEvento}
                        onChange={(evento) => this.setParam('dataEvento', evento.target.value)}
                    />
                    <TextField
                        select
                        autoFocus
                        fullWidth
                        label="Atração"
                        value={this.state.atracaoId}
                        onChange={(evento) => this.setParam("atracaoId", evento.target.value)}
                        margin="normal">

                        {this.state.atracoes.map(
                            (atracao) => <option value={atracao.id}>{atracao.nome}</option>)}
                    </TextField>

                    <TextField
                        select
                        autoFocus
                        fullWidth
                        label="Promoter"
                        value={this.state.promoterId}
                        onChange={(evento) => this.setParam("promoterId", evento.target.value)}
                        margin="normal">

                        {this.state.promoters.map(
                            (promoter) => <option value={promoter.id}>{promoter.nome}</option>
                            )}
                    </TextField>
                    <TextField
                        select
                        autoFocus
                        fullWidth
                        label="Clientes"
                        value={this.state.clienteId}
                        onChange={(evento) => this.setParam("clienteId", evento.target.value)}
                        margin="normal">

                        {this.state.clientes.map(
                            (cliente) => <option value={cliente.id}>{cliente.nome}</option>
                            )}
                    </TextField>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.enviar()} color="primary">
                        {this.state.id ? "Confirmar" : "Adicionar"}
                    </Button>
                    <Button onClick={() => { this.props.onCancelar() }} color="secondary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog >
        );
    }
}
