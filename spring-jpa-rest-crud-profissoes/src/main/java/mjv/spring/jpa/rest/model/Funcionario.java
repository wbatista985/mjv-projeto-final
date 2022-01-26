package mjv.spring.jpa.rest.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tab_funcionario")
public class Funcionario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, length = 50)
	private String nome;
	
	@Column()
	private String email;

	@Column(name = "cpf_cnpj", nullable = false, length = 20)
	private String cpfCnpj;

	@Enumerated(EnumType.STRING)
	@Column(name = "sx", columnDefinition = "char(1)")
	private Sexo sexo;

	@Embedded
	private Endereco endereco;

	@ManyToOne()
	@JoinColumn(name = "prof_id")
	private Profissao profissao;
	
	@JsonIgnore
	@OneToOne()
	@JoinColumn(name = "imagem_id")
	private Imagem imagem;
	
	@ElementCollection
	@CollectionTable(name = "telefones")
	private Set<String> telefones = new HashSet<String>();

	public Funcionario() {

	}

	public Funcionario(
			Integer id, 
			String nome, 
			String email, 
			String cpfCnpj, 
			Sexo sexo, Endereco endereco,
			Profissao profissao) {
		super();
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.cpfCnpj = cpfCnpj;
		this.sexo = sexo;
		this.endereco = endereco;
		this.profissao = profissao;
	}


	public Profissao getProfissao() {
		return profissao;
	}

	public void setProfissao(Profissao profissao) {
		this.profissao = profissao;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpfCnpj() {
		return cpfCnpj;
	}

	public void setCpfCnpj(String cpfCnpj) {
		this.cpfCnpj = cpfCnpj;
	}

	public Sexo getSexo() {
		return sexo;
	}

	public void setSexo(Sexo sexo) {
		this.sexo = sexo;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<String> getTelefones() {
		return telefones;
	}

	public void setTelefones(Set<String> telefones) {
		this.telefones = telefones;
	}

	public Imagem getImagem() {
		return imagem;
	}

	public void setImagem(Imagem imagem) {
		this.imagem = imagem;
	}
	
}
