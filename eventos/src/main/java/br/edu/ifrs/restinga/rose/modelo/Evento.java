package br.edu.ifrs.restinga.rose.modelo;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Evento implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    private String local;
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd/MM/yyyy")
    private Date dataEvento;
    @ManyToOne
    private Cliente cliente;
    @ManyToOne
    private Promoter promoter;
    @ManyToOne
    private Atracao atracao;

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getLocal() {
        return local;
    }
    public void setLocal(String local) {
        this.local = local;
    }
    public Date getDataEvento() {
        return dataEvento;
    }
    public void setDataEvento(Date dataEvento) {
        this.dataEvento = dataEvento;
    }
    public Cliente getCliente() {
        return cliente;
    }
    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    public Promoter getPromoter() {
        return promoter;
    }
    public void setPromoter(Promoter promoter) {
        this.promoter = promoter;
    }
    public Atracao getAtracao() {
        return atracao;
    }
    public void setAtracao(Atracao atracao) {
        this.atracao = atracao;
    }
}