package mjv.spring.jpa.rest.dto;

import java.io.Serializable;

import mjv.spring.jpa.rest.model.Endereco;

public class EnderecoDTO implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String rua;

	private String numero;

	private String cidade;

	private String estado;

	private String pais;

	private String cep;


	public EnderecoDTO() {
	
	}
	
	public EnderecoDTO(Endereco endereco) {
		rua = endereco.getRua();
		numero = endereco.getNumero();
		cidade = endereco.getCidade();
		estado = endereco.getEstado();
		pais = endereco.getPais();
		cep = endereco.getCep();
	}

	public String getRua() {
		return rua;
	}

	public void setRua(String rua) {
		this.rua = rua;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getPais() {
		return pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

}
