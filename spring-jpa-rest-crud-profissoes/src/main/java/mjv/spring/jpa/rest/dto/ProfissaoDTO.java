package mjv.spring.jpa.rest.dto;

import java.io.Serializable;

import mjv.spring.jpa.rest.model.Profissao;

public class ProfissaoDTO implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer id;
	
	private String nome;
	
	private Double salarioMedio;
	
	public ProfissaoDTO() {
	
	}

	public ProfissaoDTO(Profissao profissao) {
		id = profissao.getId();
		nome = profissao.getNome();
		salarioMedio = profissao.getSalarioMedio();
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

	public Double getSalarioMedio() {
		return salarioMedio;
	}

	public void setSalarioMedio(Double salarioMedio) {
		this.salarioMedio = salarioMedio;
	}
	
	
}
