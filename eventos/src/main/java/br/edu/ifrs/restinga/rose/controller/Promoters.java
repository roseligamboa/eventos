//LOCALHOST:8080/api/promoters/
package br.edu.ifrs.restinga.rose.controller;

import br.edu.ifrs.restinga.rose.ConfiguracaoSeguranca;
import static br.edu.ifrs.restinga.rose.ConfiguracaoSeguranca.PASSWORD_ENCODER;
import br.edu.ifrs.restinga.rose.autenticacao.MeuUser;
import br.edu.ifrs.restinga.rose.erros.NaoEncontrado;
import br.edu.ifrs.restinga.rose.erros.Proibido;
import br.edu.ifrs.restinga.rose.erros.RequisicaoInvalida;
import br.edu.ifrs.restinga.rose.modelo.Evento;
import br.edu.ifrs.restinga.rose.modelo.Promoter;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import br.edu.ifrs.restinga.rose.dao.PromoterDao;
import br.edu.ifrs.restinga.rose.dao.EventoDao;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.Date;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping(path = "/api/promoters")
public class Promoters {
    
    @Autowired
    PromoterDao promoterDAO;
    
    @Autowired
    EventoDao eventoDAO;
    
///////////// VALIDAÇÕES DO PROMOTER////////////////////////    
    
    public void validaPromoter(Promoter promoter){
        if (promoter.getNome() == null || promoter.getNome().isEmpty()){
            throw new RequisicaoInvalida("NOME do promoter é obrigatório");
        }
        if (promoter.getLogin()== null || promoter.getLogin().isEmpty()){
            throw new RequisicaoInvalida("LOGIN do promoter é obrigatório");
        }
        if (promoter.getNovaSenha() == null || promoter.getNovaSenha().isEmpty()){
            throw new RequisicaoInvalida("SENHA do promoter é obrigatória");
        }
        if (promoter.getPermissao() == null || promoter.getPermissao().isEmpty()) {
            throw new RequisicaoInvalida("permissão e obrigatorio");
        }
    }
    
///////////// LISTAR PROMOTERS //////////////////////// 
    
@RequestMapping(path = "/", method = RequestMethod.GET)
public Iterable<Promoter> listar(@AuthenticationPrincipal MeuUser usuarioAut) {
    //VERIFICA SE O USUARIO E ADMINISTRADOR PARA PODER INSERIR OS PROMOTERS
    if (usuarioAut.getUsuario().getPermissao().contains("administrador")) {
        return promoterDAO.findAll();
    }else
    throw new Proibido("Não é permitido acessar dados de outro usuários"); 
}

///////////// INSERIR PROMOTER //////////////////////// 
     @RequestMapping(path = "/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Promoter inserir(@AuthenticationPrincipal MeuUser usuarioAut, @RequestBody Promoter promoter) {
        promoter.setId(0);
        //INSERE A SENHA QUE VEM DO FRONT NA SENHA QUE VAI ESTAR NO BANCO
        promoter.setSenha(PASSWORD_ENCODER.encode(promoter.getNovaSenha()));
        //VALIDA OS CAMPOS
        validaPromoter(promoter);
        //PEGA O LOGIN DO USUARIO E FAZ UMA PESQUISA PARA VER SE JÁ NÃO TEM ESTE LOGIN NO BANCO
        Promoter loginBanco = promoterDAO.findByLogin(promoter.getLogin());
        // SE TIVER ELE AVISA QUE ESTE LOGIN JÁ EXISTE
        if (loginBanco != null) {
            throw new RequisicaoInvalida("Este login JÁ EXISTE. Escolha outro");
        }
        //ESTE SE O USUARIO FOR DIFERENTE DE ADMINISTRADOR OU FOR NULO ELE INSERE A PERMISSÃO COMO USUARIO COMUM
        if (usuarioAut == null || !usuarioAut.getUsuario().getPermissao().contains("administrador")) {
            promoter.setPermissao("usuario");
        }
        Promoter usuarioSalvo = promoterDAO.save(promoter);
        return usuarioSalvo;
    }
        
///////////// RECUPERAR PROMOTER PELA ID ////////////////////////  
    
    
@RequestMapping(path = "/{id}", method = RequestMethod.GET)
public Promoter recuperar(@AuthenticationPrincipal MeuUser usuarioAut, 
        @PathVariable int id) {
    //SO PODE LISTAR O SEU PROPRIO USUARIO OU SE FOR ADMINISTRADOR PODE LISTAR QUALQUER USUARIO
    if (usuarioAut.getUsuario().getId() == id
        || usuarioAut.getUsuario().getPermissao().contains("administrador")) {
        return promoterDAO.findById(id).get();
    } else {
        throw new Proibido("Não é permitido acessar dados de outro usuários");
    }
}
   
///////////// ATUALIZAR PROMOTER PELA ID ////////////////////////  
    
   

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void atualizar(@PathVariable int id, @RequestBody Promoter promoter){
        if (promoterDAO.existsById(id)){
            promoter.setId(id);
            //METODO QUE VALIDA OS CAMPOS
            validaPromoter(promoter);
            //INSERE A SENHA QUE VEM DO REACT NA SENHA QUE VAI PARA O BANCO
            promoter.setSenha(PASSWORD_ENCODER.encode(promoter.getNovaSenha()));
            
            promoterDAO.save(promoter);
        }else{
            throw new NaoEncontrado("Promoter NÃO encontrado");
        }
    }
    
///////////// APAGAR PROMOTER PELA ID ////////////////////////               
    
    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void apagar(@PathVariable int id){
        //PEGA TODOS OS EVENTOS E COLOCA NUMA LISTA
         List<Evento> eventos = (List<Evento>) eventoDAO.findAll();
         // PEGA A LISTA DE EVENTOS E PERCORRE E DEPOIS FILTRA E VERIFICA SE ALGUM EVENTO TEM O PROMOTER
         //COM A ID QUE ESTA SENDO PASSADA COMO PARAMETRO, SE ESSES PROMOTER TIVER UM EVENTO VAI DAR O ALERT
         eventos.stream().filter((listaEventos) -> (listaEventos.getPromoter().getId() == id)).forEachOrdered((_item) -> {
             throw new Proibido("ATENÇÃO: Promoter com evento ativo. Exclua o evento antes de remover este promoter");
        });
        if (promoterDAO.existsById(id)){
            promoterDAO.deleteById(id);
        }else {
            throw new NaoEncontrado("Promoter NÃO encontrado");
        }
    }
    
    //METODO QUE EXECUTA O LOGIN DO PROMOTER
    @RequestMapping(path = "/login/", method = RequestMethod.GET)
    public ResponseEntity<Promoter> loginToken(@RequestParam String login,@RequestParam String senha)
            throws UnsupportedEncodingException {
        //VARIAVEL QUE GUARDA O LOGIN QUE VEM DO METODO
       Promoter usuario = login(login, senha);
       //VARIAVEL QUE GUARDA O TOKEN QUE VEM DO METODO
        String token = token(usuario);
        //RETORNO O USUARIO E O TOKEN GERADO
        return ResponseEntity.ok().header("token", token).body(usuario);
    }
    
    //METODO QUE PEGA O USUARIO E FAZ O TOKEN
     public String token(Promoter usuario) throws UnsupportedEncodingException {
        Algorithm algorithm = Algorithm.HMAC256(ConfiguracaoSeguranca.SEGREDO);
        Calendar agora = Calendar.getInstance();
        //ADICIONO OS MINUTOS QUE QUERO QUE O TOKEN FIQUE VALIDO DEPOIS DESTE TEMPO ELE EXPIRA
        agora.add(Calendar.MINUTE, 15);
        Date expira = agora.getTime();
        String token = JWT.create()
                .withClaim("id", usuario.getId()).
                withExpiresAt(expira).
                sign(algorithm);
        return token;
    }
     //METODO QUE VERIFICA SE O LOGIN DO USUARIO ESTA CORRETO OU NÃO
    public Promoter login(String login, String senha) {
        Promoter usuarioBanco = promoterDAO.findByLogin(login);
        if (usuarioBanco != null) {
            boolean senhasIguais = ConfiguracaoSeguranca.PASSWORD_ENCODER.matches(senha, usuarioBanco.getSenha());
            if (senhasIguais) {
                return usuarioBanco;
            }
        }
        throw new NaoEncontrado("Usuário e/ou senha incorreto(s)");
    }
}