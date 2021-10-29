/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifrs.restinga.rose;



import static br.edu.ifrs.restinga.rose.ConfiguracaoSeguranca.PASSWORD_ENCODER;
import br.edu.ifrs.restinga.rose.dao.PromoterDao;
import br.edu.ifrs.restinga.rose.modelo.Promoter;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Xinicializador {
    @Autowired
    PromoterDao usuarioDAO;
    // Executa o método logo após a aplicação spring inicializar por completo 
    @PostConstruct
    public void init() {
        //coloca um usuario inicial no banco quando iniciar a aplicação
        Promoter usuarioRoot = usuarioDAO.findByLogin("rose");
        if (usuarioRoot == null) {
            usuarioRoot = new Promoter();
            usuarioRoot.setNome("rose");
            usuarioRoot.setLogin("rose");
            usuarioRoot.setSenha(PASSWORD_ENCODER.encode("12345"));
            usuarioRoot.setPermissao("administrador");
            usuarioDAO.save(usuarioRoot);
        }
    }
}
