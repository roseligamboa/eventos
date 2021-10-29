//LOCALHOST:8080/api/atracoes/

package br.edu.ifrs.restinga.rose.controller;

import br.edu.ifrs.restinga.rose.erros.NaoEncontrado;
import br.edu.ifrs.restinga.rose.erros.RequisicaoInvalida;
import br.edu.ifrs.restinga.rose.modelo.Atracao;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import br.edu.ifrs.restinga.rose.erros.Proibido;
import br.edu.ifrs.restinga.rose.modelo.Evento;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;
import br.edu.ifrs.restinga.rose.dao.AtracaoDao;
import br.edu.ifrs.restinga.rose.dao.EventoDao;

@RestController
@RequestMapping(path = "/api")
public class Atracoes {

    @Autowired
    AtracaoDao atracaoDAO;
    @Autowired
    EventoDao eventoDAO;
    
///////////// VALIDAÇÕES ////////////////////////       
    
    public void verificaAtracao(Atracao atracao){
        if (atracao.getNome() == null || atracao.getNome().isEmpty()) {
            throw new RequisicaoInvalida("NOME da ATRAÇÃO é obrigatório");
        }
        if (atracao.getValor()<= 0) {
            throw new RequisicaoInvalida("VALOR da ATRAÇÃO é obrigatório");
        }
        if (atracao.getDuracao() <= 0) {
            throw new RequisicaoInvalida("DURAÇÃO da ATRAÇÃO é obrigatório");
        }
    }
    
///////////// LISTAR ATRAÇÕES ////////////////////////       

    @RequestMapping(path = "/atracoes/", method = RequestMethod.GET)
    public Iterable<Atracao> listar(){
        return atracaoDAO.findAll();
    }
    
///////////// INSERIR ATRAÇÃO ////////////////////////       

    @RequestMapping(path = "/atracoes/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Atracao inserir(@RequestBody Atracao atracao){
        atracao.setId(0);
        verificaAtracao(atracao);
        return atracaoDAO.save(atracao);
    }
    
///////////// RECUPERAR ATRAÇÃO PELA ID ////////////////////////       

    @RequestMapping(path = "/atracoes/{id}", method = RequestMethod.GET)
    public Atracao recuperar(@PathVariable int id){
        Optional<Atracao> findById = atracaoDAO.findById(id);
        if(findById.isPresent()){
            return findById.get();
        }else{
            throw new NaoEncontrado("Atração NÃO encontrada");
        }
    }
    
///////////// ATUALIZAR ATRAÇÃO PELA ID ////////////////////////       

    @RequestMapping(path = "/atracoes/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void atualizar(@PathVariable int id, @RequestBody Atracao atracao){
        if(atracaoDAO.existsById(id)){
            atracao.setId(id);
            verificaAtracao(atracao);
            atracaoDAO.save(atracao);
        }else{
            throw new NaoEncontrado("Atração NÃO encontrada");
        }
    }
    
///////////// APAGAR ATRAÇÃO PELA ID ////////////////////////               
    
    @RequestMapping(path = "/atracoes/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void apagar(@PathVariable int id){
         List<Evento> eventos = (List<Evento>) eventoDAO.findAll();
         eventos.stream().filter((listaEventos) -> (listaEventos.getAtracao().getId() == id)).forEachOrdered((_item) -> {
             throw new Proibido("ATENÇÃO: Atração com evento ativo. Exclua o evento antes de remover esta atração!");
        });
        if (atracaoDAO.existsById(id)){
            atracaoDAO.deleteById(id);
        }else {
            throw new NaoEncontrado("Atração NÃO encontrada");
        }
    }
    
    /////////////// PESQUISA ATRAÇÕES POR NOME DO CLIENTE ////////////////////////   
    //LOCALHOST:8080/api/atracoes/pesquisar/atracoesDoCliente/?nome=Rabisguelo
    
     @RequestMapping( path = "/atracoes/pesquisar/atracoesDoCliente/", method = RequestMethod.GET)
     public List <Atracao> buscarAtracoesDumCliente(@RequestParam(required = true) String nome){
         
        if(nome.isEmpty()){
            throw new RequisicaoInvalida("Escolha o NOME DE UM CLIENTE para pesquisar...");
        } else{
            return atracaoDAO.listarAtracaoDumCliente(nome);
        }
     }     

}     