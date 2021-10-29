//LOCALHOST:8080/api/eventos/

package br.edu.ifrs.restinga.rose.controller;

import br.edu.ifrs.restinga.rose.erros.NaoEncontrado;
import br.edu.ifrs.restinga.rose.modelo.Evento;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import br.edu.ifrs.restinga.rose.erros.RequisicaoInvalida;
import br.edu.ifrs.restinga.rose.dao.EventoDao;
import java.util.Date;

@RestController
@RequestMapping(path = "/api")
public class Eventos {
 @Autowired
  EventoDao eventoDAO;
 

    
///////////// VALIDAÇÕES ////////////////////////       
    
    public void verificaEvento(Evento evento){
        if (evento.getNome()== null || evento.getNome().isEmpty()) {
            throw new RequisicaoInvalida("NOME do evento é obrigatório");
        }
        if (evento.getLocal()== null || evento.getLocal().isEmpty()) {
            throw new RequisicaoInvalida("LOCAL do evento é obrigatório");
        }
        if (evento.getDataEvento()== null) {
            throw new RequisicaoInvalida("DATA do evento é obrigatória");
        }
        // VERIFICA SE O DIA E MENOR QUE O DIA DE HOJE
        if (evento.getDataEvento().before(pegaDataAtual())) {
            throw new RequisicaoInvalida("data do evento invalida ou data menor que o dia atual");
        }
        if (evento.getAtracao() == null) {
            throw new RequisicaoInvalida("Que ATRAÇÃO teremos no evento?");
        }
        if (evento.getCliente()== null) {
            throw new RequisicaoInvalida("Para qual CLIENTE será o evento?");
        }
        if (evento.getPromoter()== null) {
            throw new RequisicaoInvalida("Qual PROMOTER está gerando este evento?");
        }
    } 
    // METODO QUE PEGA O DIA ATUAL DO SISTEMA
   public Date pegaDataAtual(){
        return new Date(System.currentTimeMillis());
    }
 
///////////// LISTA OS EVENTOS ////////////////////////       

    @RequestMapping(path = "/eventos/", method = RequestMethod.GET)
    public Iterable<Evento> listar() {
        return eventoDAO.findAll();
    }
    
///////////// INSERE EVENTO ////////////////////////       

    @RequestMapping(path = "/eventos/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Evento inserir(@RequestBody Evento evento) {
        evento.setId(0);
        verificaEvento(evento);
        Evento eventoSalvo = eventoDAO.save(evento);
        return eventoSalvo;
    }
    
///////////// RECUPERA EVENTO PELA ID ////////////////////////       

    @RequestMapping(path = "/eventos/{id}", method = RequestMethod.GET)
    public Evento recuperar(@PathVariable int id) {
        Optional<Evento> findById = eventoDAO.findById(id);
        if (findById.isPresent()) {
            return findById.get();
        } else {
            throw new NaoEncontrado("Evento NÃO encontrado");
        }
    }
    
///////////// ATUALIZA EVENTO PELA ID ////////////////////////       

    @RequestMapping(path = "/eventos/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void atualizar(@PathVariable int id, @RequestBody Evento evento){
        if(eventoDAO.existsById(id)) {
            evento.setId(id);
            verificaEvento(evento);            
            eventoDAO.save(evento);
                    
        } else {
        throw new NaoEncontrado("Evento NÃO encontrado");
        }
    }
    
///////////// APAGA EVENTO PELA ID ////////////////////////       

    @RequestMapping(path = "/eventos/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void apagar(@PathVariable int id) {
        if (eventoDAO.existsById(id)) {
            eventoDAO.deleteById(id);
        } else {
            throw new NaoEncontrado("Evento NÃO encontrado");
        }
    }
}