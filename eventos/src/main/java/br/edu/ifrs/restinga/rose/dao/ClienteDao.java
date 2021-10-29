package br.edu.ifrs.restinga.rose.dao;

import br.edu.ifrs.restinga.rose.modelo.Cliente;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteDao extends CrudRepository<Cliente,Integer >{
    
@Query(nativeQuery = true, value = "select * from cliente c inner join evento e on c.id = e.cliente_id inner join atracao a on a.id = e.atracao_id where a.nome = :nome")
    List <Cliente> listarClientesDumaAtracao(@Param("nome") String nome);
    @Override
    List <Cliente> findAll();
    
}
