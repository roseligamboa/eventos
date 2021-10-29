import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PesquisaClientes from './PesquisaClientes';
import PesquisaAtracao from './PesquisaAtracao';

export default class PesquisaPai extends Component {
    constructor() {
        super();
        this.state = {
            exibirFormulario: false,
            exibirFormulario1:false,
        };
    }
    novo() {
        this.setState({
            exibirFormulario: true,
        });
    }
    novo1() {
        this.setState({
            exibirFormulario1: true,
        });
    }
    
    voltar() {
        this.setState({
            exibirFormulario: false,
        });
    }
    voltar1() {
        this.setState({
            exibirFormulario1: false,
        });
    }
    render() {
        return (
            <div>
                <div>
                    {this.state.exibirFormulario1 ? <PesquisaClientes
                        onVoltar1={() => this.voltar1()}
                         /> :
                        <Button onClick={() => this.novo1()} color="primary">
                            Pesquise quem contratou a atração!
                </Button>}
                </div>
                <div>
                    {this.state.exibirFormulario ? <PesquisaAtracao
                        onVoltar={() => this.voltar()} /> :
                        <Button onClick={() => this.novo()} color="primary">
                            Pesquise quais as atrações que um cliente pediu!
                </Button>}

                </div>

            </div>
        );
    }
}