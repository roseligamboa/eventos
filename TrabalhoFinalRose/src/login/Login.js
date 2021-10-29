import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default class Login extends React.Component  {
    constructor() {
        super();
        this.state={
            login:"",
            senha:""
        };
    }
    /*metodo para pegar o erro que vem do servidor 
    tratar e mostrar no console
     */
    tratarErro(erro) {
        console.log(erro.response);
        if (erro.response.data.message)
            alert(erro.response.data.message);
        else
            alert(erro.response.data);
    }

    /* metodo que faz o login */
    async login() {
        /* constantes que guardam o login com codificação para poder passar por parametro */
        const login= encodeURI(this.state.login);
        const senha= encodeURI(this.state.senha);
        /* um try e catch para executar a ação de ir verificar se o login esta correto
        se estiver ele retorna com o token junto que passo o usuario e o token para o metodo
        no componente pai neste caso o app.js*/
        try{
            let retorno = await 
            axios.get("/api/promoters/login/?login="
            +login+"&senha="+senha);
            let token = retorno.headers.token;
            if(token) {
                this.props.onLogin(retorno.data, token);
            }
        }catch(erro){
            this.tratarErro(erro);
        }
    } 
    render() {
        return <Grid container justify="center" alignItems="center" style={
            {
                height: "100vh",

            }}>
            <Grid item xs="8" md="5" lg="3"  xl="3" >
                <Paper style={{ padding: "20px" }}>
                    <AppBar position="static">
                        <Toolbar>Login</Toolbar>
                    </AppBar>
                    <br/>
           <TextField 
                    autoFocus
                    fullWidth
                    margin="dense"
                    label="Login"
                    value={this.state.login}
                    onChange={
                        (event) =>this.setState({
                            login:event.target.value
                        })
                       } /> <br/><br/>
            
            <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    label="Senha"
                    type="password"
                    value={this.state.senha}
                    onChange={
                        (event) => this.setState({
                            senha:event.target.value
                        })
                    }
                 />
            <br/><br/>
            <Button 
            fullWidth 
            variant="raised"
            onClick={()=>this.login()} 
            >login</Button>
       <br/>
                </Paper>
            </Grid>
        </Grid>
    } 
}