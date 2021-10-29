import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import ListaPesquisaAtracao from './ListaPesquisaAtracao';


export default class PesquisaAtracao extends Component {
    constructor(props) {
        super(props);
            this.state = {
                nome: "",
                atracoes:[],
                carregar:true,
            }
    }
    setParam(param, valor) {
        this.setState({
            [param]: valor
        });
    }
    tratarErro(erro) {
        console.log(erro.response);
        if (erro.response.data.message)
            alert(erro.response.data.message);
        else
            alert(erro.response.data);
    }
   
    pesquisar() {
        let nome =this.state.nome
        axios.get('/api/atracoes/pesquisar/atracoesDoCliente/?nome='+nome ).then(
            (retorno) =>{this.setState({
                atracoes:retorno.data,
                carregar:false,
            });
            
        } 
        ).catch((erro) => this.tratarErro(erro));
    }
   
    cancelar(){
        this.setState({
            nome:""
        });
    }
    render() {
        return (
            <Dialog
                open={true}
            >
                <DialogTitle>
                    <h3>Descubra quais as atrações que um cliente pediu!</h3></DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label=" nome do cliente"
                        fullWidth="100%"
                        value={this.state.nome}
                        onChange={(evento) => this.setParam('nome', evento.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={() => this.pesquisar()} color="primary">
                    <Icon color="#a40808" fontSize="large" >pageview</Icon>
                    </IconButton>
                    <IconButton onClick={() => {this.props.onVoltar() }} color="black">
                        voltar
                    </IconButton>
                    <IconButton onClick={() => {this.cancelar() }} color="secondary">
                        limpar
                    </IconButton>
                    
                </DialogActions>
                { this.state.carregar?<h5>carregando a lista</h5>:<ListaPesquisaAtracao
                listarAtracao = {this.state.atracoes}/>}
               
            </Dialog>
        );
    }
}