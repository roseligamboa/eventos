import React, { Component } from 'react';
import PromoterPai from './promoters/PromoterPai';
import ClientePai from './clientes/ClientePai';
import AtracaoPai from './atracao/AtracaoPai';
import PesquisaPai from './pesquisa/PesquisaPai';
import Login from './login/Login';
import axios from 'axios'; 
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { MenuList } from '@material-ui/core';
import EventoPai from './evento/EventoPai';

class App extends Component {
  constructor() {
    super();
    this.state = {
      /**crio uma variavel e inicializio como falso */
      logado:false,
      selecionado: "",
      /**array de menu onde cada nome corresponde a um componente */
      menu: [
        {
          nome: "PROMOTER",
          componente: PromoterPai
        },
        {
          nome: "CLIENTES",
          componente: ClientePai
        },
        {
          nome: "ATRACAO",
          componente: AtracaoPai
        },
        {
          nome:"EVENTO",
          componente: EventoPai
        },
        {
          nome:"PESQUISA",
          componente:PesquisaPai
        }
      ]
    };
  }
  
  /**
   * metodo que tem como o parametro o usuario e o token 
   * seta o usuario com o usuario que vem da api
   * e seta a variavel logado como true para poder mostrar o menu do programa
   */
  login(usuario, token) {
    axios.defaults.headers.common['token']=token;
    localStorage.setItem("token",token);
    this.setState({
      logado:true,
      usuario:usuario
    });
  }
  
  render() {
    /**
     * se logado for verdadeiro vai mostrar o menu principal da aplicação
     */
    if(this.state.logado)
    return <Router><div>
      <nav>
      <MenuList>
          {this.state.menu.map((menu, indice) =>
            <MenuItem><NavLink key={menu.nome} to={"/" + indice} activeClassName="selecionado">
              {menu.nome}</NavLink>
            </MenuItem>
          )}
           </MenuList>
        </nav>
        
      {this.state.menu.map(
        (menu, indice) => <Route path={"/" + indice} component={menu.componente} />
      )}
     
    </div></Router>;
    /**
     * se logado for falso a aplicação vai mostrar o componente de menu da aplicação
     */
    else
    return <Login onLogin={(usuario, token)=>this.login(usuario, token)} />;
  
  }
}

export default App;


