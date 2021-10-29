package br.edu.ifrs.restinga.rose.dao;

import br.edu.ifrs.restinga.rose.modelo.Promoter;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromoterDao extends CrudRepository <Promoter, Integer> {
    public Promoter findByLogin(String login);
    
}