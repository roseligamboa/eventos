
package br.edu.ifrs.restinga.rose.autenticacao;
import br.edu.ifrs.restinga.rose.modelo.Promoter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;


public class MeuUser extends User {
    private final Promoter usuario;
    public MeuUser(Promoter usuario) {
        super(usuario.getLogin(),
                usuario.getSenha(),
                AuthorityUtils.createAuthorityList(
                    usuario.getPermissao()));
        this.usuario=usuario;
    }
    public Promoter getUsuario() {
        return usuario;
    }
}
