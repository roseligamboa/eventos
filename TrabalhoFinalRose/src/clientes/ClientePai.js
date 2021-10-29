import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Clientes from './Clientes';
import ListarClientes from './ListarClientes';


export default class ClientePai extends Component {
    constructor() {
        super();
        this.state = {
            clientes: [],
            editarCliente: null,
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
        this.listarCliente();
    }
    listarCliente() {
        axios.get("/api/clientes/").then(
            (retorno) => this.setState({
                clientes: retorno.data
            })
        ).catch((erro) => this.tratarErro(erro));
    }
    adicionarClientes(cliente) {
        axios.post("/api/clientes/", cliente).then(
            (insere) => {
                this.setState({
                    clientes: [...this.state.clientes, insere.data]
                });
                this.limpar();
            }
        ).catch((erro)=>this.tratarErro(erro));
    }
    confirmarEdicao(cliente) {
        axios.put("/api/clientes/" + cliente.id, cliente).then(
            () => {
                this.listarCliente();
                this.limpar();
            }
        ).catch((erro)=>this.tratarErro(erro));
    }
    excluirCliente(cliente) {
        axios.delete("/api/clientes/" + cliente.id).then(
            () => this.listarCliente()
        ).catch((erro)=>this.tratarErro(erro));
    }
    editar(cliente) {
        this.setState({
            editarCliente: cliente,
            exibirFormulario: true,
        });
    }
    limpar() {
        this.setState({
            editarCliente: null,
            exibirFormulario: false,
        });
    }
    novo() {
        this.setState({
            editarCliente: null,
            exibirFormulario: true,
        });
    }
    render() {
        return (
            <div><h3>LISTA DE CLIENTES</h3>
                <ListarClientes
                    listarCliente={this.state.clientes}
                    onEditar={(cliente) => this.editar(cliente)}
                    onExcluirCliente={(cliente) => this.excluirCliente(cliente)} />
                <br /><br />
                {this.state.exibirFormulario ? <Clientes key={this.state.editarCliente ?
                    this.state.editarCliente.id : "novo"}
                    editar={this.state.editarCliente}
                    onCancelar={() =>this.limpar()}
                    onEditar={(cliente) => this.confirmarEdicao(cliente)}
                    onAdicionarCliente={(cliente) => this.adicionarClientes(cliente)} /> :
                    <Button onClick={() => this.novo()} color = "primary">
                    NOVO CLIENTE
                    </Button>}

            </div>
        );
    }
}