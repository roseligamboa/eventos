package br.edu.ifrs.restinga.rose.dao;

import br.edu.ifrs.restinga.rose.modelo.Atracao;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AtracaoDao extends CrudRepository<Atracao, Integer> {
    
    @Query(nativeQuery = true, value = "select * from atracao a inner join evento e on a.id = e.atracao_id inner join cliente c on c.id = e.cliente_id where c.nome = :nome")
    List <Atracao> listarAtracaoDumCliente(@Param("nome") String nome);
    @Override
    List <Atracao> findAll();
    
}
