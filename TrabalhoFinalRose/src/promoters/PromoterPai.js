import React, { Component } from 'react';
import axios from 'axios';
import ListarUsuario from './ListarPromoter';
import Button from '@material-ui/core/Button';
import Promoters from './Promoters';

export default class PromoterPai extends Component {
    constructor() {
        super();
        this.state = {
            promoters: [],
            editarPromoters: null,
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
        this.listarPromoter();
    }
    listarPromoter() {
        axios.get("/api/promoters/").then(
            (retorno) => this.setState({
                promoters: retorno.data
            })
        ).catch((erro)=>this.tratarErro(erro));
    }
    adicionarPromoter(promoter) {
        axios.post("/api/promoters/", promoter).then(
            (insere) => {
                this.setState({
                    promoters: [...this.state.promoters, insere.data]});
                    this.limpar();
                }
        ).catch((erro)=>this.tratarErro(erro));
    }
    confirmarEdicao(promoter) {
        axios.put("/api/promoters/" + promoter.id, promoter).then(
            () => {
                this.listarPromoter();
                this.limpar();
            }
        ).catch((erro)=>this.tratarErro(erro));
        
    }
    excluirPromoter(promoter) {
        axios.delete("/api/promoters/" + promoter.id).then(
            () => this.listarPromoter()
        ).catch((erro)=>this.tratarErro(erro));
    }
    editar(promoter) {
        this.setState({
            exibirFormulario: true,
            editarPromoters: promoter,
        });
    }
    limpar() {
        this.setState({
            editarPromoters: null,
            exibirFormulario: false,
        });
    }
    novo() {
        this.setState({
            editarPromoters: null,
            exibirFormulario: true,
        });
    }
    render() {
        return (
            <div><h3>lISTA DE PROMOTERS</h3>
                <ListarUsuario
                    listarPromoter={this.state.promoters}
                    onEditar={(promoter) => this.editar(promoter)}
                    onExcluirPromoter={(promoter) => this.excluirPromoter(promoter)} />
                <br /><br />
                {this.state.exibirFormulario?<Promoters key={this.state.editarPromoters ?
                    this.state.editarPromoters.id : "novo"}
                    editar={this.state.editarPromoters}
                    onCancelar={() =>this.limpar()}
                    onEditar={(promoter) => this.confirmarEdicao(promoter)}
                    onAdicionar={(promoter) => this.adicionarPromoter(promoter)} />:
                    <Button onClick={() => this.novo()} color="primary">
                    NOVO PROMOTER
                    </Button>}
                
            </div>
        );
    }
}