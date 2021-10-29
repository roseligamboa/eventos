import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class Promoters extends Component {
    constructor(props) {
        super(props);
        if (this.props.editar) {
            this.state = {
                id: this.props.editar.id,
                nome: this.props.editar.nome,
                login:this.props.editar.login,
                novaSenha:this.props.editar.novaSenha,
                permissao:this.props.editar.permissao, 
            }
        } else {
            this.state = {
                nome: "",
                login: "",
                novaSenha: "",
                permissao:"",
            };
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
                login: this.state.login,
                novaSenha:this.state.novaSenha,
                /*não deixo editar a permissão do promoter */
                permissao:this.props.editar.permissao,
            })

        }else{
            this.props.onAdicionar({
                nome: this.state.nome,
                login: this.state.login,
                novaSenha: this.state.novaSenha,
                permissao:this.state.permissao,           
            });
        }
        this.setState({
            id: "",
            nome: "",
            login: "",
            novaSenha: "",
            permissao:"",
            
        });
    }
    render() {
        return <Dialog
        open={true}
    >
             <DialogTitle>{this.state.id?
            <h3> Editar Promoter {this.state.nome}  </h3>:
                <h3>Cadastrar Promoter</h3> }</DialogTitle>
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
                    label="Login"
                    fullWidth
                    value={this.state.login}
                    onChange={(evento) => this.setParam('login', evento.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Senha"
                    fullWidth
                    type="password"
                    value={this.state.novaSenha}
                    onChange={(evento) => this.setParam('novaSenha', evento.target.value)}
                />
                {this.state.id?"":
                <TextField
                    select
                    autoFocus
                    margin="dense"
                    label="Permissões"
                    fullWidth
                    value={this.state.permissao}
                    onChange={(evento) => this.setParam('permissao', evento.target.value)}
                    >
                        {/*faço um seletor que ja tem os valores dentro de administrador ou usuario*/}
                     <option value="administrador">administrador</option>
                     <option value="usuario">usuario</option>
                    </TextField>    }
               
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.enviar()} color="primary">
                {this.state.id ? "Confirmar" : "Adicionar"}
              </Button>
                <Button onClick={() => { this.props.onCancelar() }} color="secondary">
                Cancelar
              </Button>
            </DialogActions>
            </Dialog>

    }
}