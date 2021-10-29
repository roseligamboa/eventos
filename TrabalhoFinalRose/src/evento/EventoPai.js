import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Evento from './Evento';
import ListarEvento from './ListarEvento';

export default class EventoPai extends Component {

    constructor() {
        super();
        this.state = {
            eventos: [],
            editarEvento: null,
        };
    }

    tratarErro(erro) {
        console.log(erro.response);
        if (erro.response.data.message)
            alert(erro.response.data.message);
        else
            alert(erro.response.data);
    }

    componentDidMount() {
        this.ListarEventos();
    }
    ListarEventos() {
        this.setState({
            eventos: []
        });
        axios.get("/api/eventos/").then(
            (retorno) => this.setState({
                eventos: retorno.data
            })
        ).catch((erro) => this.tratarErro(erro));
    }

    confirmarEdicao(evento) {
        axios.put("/api/eventos/" + evento.id, evento).then(
            () => {
                this.ListarEventos();
                this.limpar();
            }
        ).catch((erro) => this.tratarErro(erro));
    }


    adicionarEvento(evento) {
        axios.post("/api/eventos/", evento).then(
            (retorno) => {
                this.setState({
                    eventos: [...this.state.eventos, retorno.data]});
                this.limpar();
            }
        ).catch((erro) => this.tratarErro(erro));

    }
    excluir(evento) {
        axios.delete("/api/eventos/" + evento.id).then(
            () => this.ListarEventos()
        ).catch((erro) => this.tratarErro(erro));
    }

    editar(evento) {
        this.setState({
            editarEvento: evento,
            exibirFormulario: true
        });
    }
    limpar() {
        this.setState({
            editarEvento: null,
            exibirFormulario: false,
        });
    }
    novo() {
        this.setState({
            exibirFormulario: true,
            editarEvento:null,
        });
    }
    render() {
        return (
            <div><h3>LISTA DE EVENTOS</h3>
                <ListarEvento
                    listarEvento={this.state.eventos}
                    onExcluir={(evento) => this.excluir(evento)}
                    onEditar={(evento) => this.editar(evento)}
                     />
                <br></br>
                {this.state.exibirFormulario ? <Evento key={this.state.editarEvento ?
                        this.state.editarEvento.id : "novo"}
                    editar={this.state.editarEvento}
                    onCancelar={() =>this.limpar()}
                    onEditar={(evento) => this.confirmarEdicao(evento)}
                    onAdicionar={(evento) => this.adicionarEvento(evento)} />:
                    <Button onClick={() => this.novo()}color="primary">
                    NOVO EVENTO
                    </Button>}
                    

            </div>
        );
    }
}
