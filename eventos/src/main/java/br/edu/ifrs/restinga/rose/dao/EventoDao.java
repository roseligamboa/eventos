package br.edu.ifrs.restinga.rose.dao;

import br.edu.ifrs.restinga.rose.modelo.Evento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoDao extends CrudRepository<Evento, Integer>{
    
    
}
