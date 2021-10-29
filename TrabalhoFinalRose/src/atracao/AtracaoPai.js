import React, { Component } from 'react';
import axios from 'axios';
import Atracao from './Atracao';
import Button from '@material-ui/core/Button';
import ListarAtracao from './ListarAtracao';


export default class AtracaoPai extends Component {
    constructor() {
        super();
        this.state = {
            atracoes: [],
           editarAtracao: null,
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
        this.listarAtracao();
    }
    listarAtracao() {
        axios.get("/api/atracoes/").then(
            (retorno) => this.setState({
                atracoes: retorno.data
            })
        ).catch((erro) => this.tratarErro(erro));
    }
    adicionarAtracao(atracao) {
        axios.post("/api/atracoes/", atracao).then(
            (insere) => {
                this.setState({
                    atracoes: [...this.state.atracoes, insere.data]
                });
                this.limpar();
            }
        ).catch((erro)=>this.tratarErro(erro));
    }
    confirmarEdicao(atracao) {
        axios.put("/api/atracoes/" + atracao.id, atracao).then(
            () => {
                this.listarAtracao();
                this.limpar();
            }
        ).catch((erro)=>this.tratarErro(erro));
    }
    excluirAtracao(atracao) {
        axios.delete("/api/atracoes/" + atracao.id).then(
            () => this.listarAtracao()
        ).catch((erro)=>this.tratarErro(erro));
    }
    editar(atracao) {
        this.setState({
           editarAtracao: atracao,
            exibirFormulario: true,
        });
    }
    limpar() {
        this.setState({
           editarAtracao: null,
            exibirFormulario: false,
        });
    }
    novo() {
        this.setState({
           editarAtracao: null,
            exibirFormulario: true,
        });
    }
    render() {
        return (
            <div><h3>LISTA DE ATRAÇÕES</h3>
                <ListarAtracao
                    listarAtracao={this.state.atracoes}
                    onEditar={(atracao) => this.editar(atracao)}
                    onExcluirAtracao={(atracao) => this.excluirAtracao(atracao)} />
                <br /><br />
                {this.state.exibirFormulario ? <Atracao key={this.state.editarAtracao?
                    this.state.editarAtracao.id : "novo"}
                    editar={this.state.editarAtracao}
                    onCancelar={() =>this.limpar()}
                    onEditar={(atracao) => this.confirmarEdicao(atracao)}
                    onAdicionarAtracao={(atracao) => this.adicionarAtracao(atracao)} /> :
                    <Button onClick={() => this.novo()} color = "primary">
                    NOVa ATRAÇÃO
                    </Button>}

            </div>
        );
    }
}