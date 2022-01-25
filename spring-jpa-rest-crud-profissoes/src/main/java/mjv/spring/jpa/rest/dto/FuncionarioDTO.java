package mjv.spring.jpa.rest.dto;

import java.io.Serializable;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import mjv.spring.jpa.rest.model.Endereco;
import mjv.spring.jpa.rest.model.Funcionario;
import mjv.spring.jpa.rest.model.Profissao;
import mjv.spring.jpa.rest.model.Sexo;

public class FuncionarioDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id;

	@NotEmpty(message = "Preenchimento obrigatório")
	@Length(min = 5, max = 120, message = "O tamanho deve ser entre 5 e 120 caracteres")
	private String nome;

	@NotEmpty(message = "Preenchimento obrigatório")
	@Email(message = "Email inválido")
	private String email;

	private String cpfCnpj;

	private Sexo sexo;

	private EnderecoDTO endereco;

	private ProfissaoDTO profissao;
	
	@NotEmpty(message = "Preenchimento obrigatório")
	private String telefone1;
	
	private String telefone2;
	
	private String telefone3;
	
	public FuncionarioDTO() {
		super();
	}

	public FuncionarioDTO(Funcionario funcionario) {
		id = funcionario.getId();
		nome = funcionario.getNome();
		email = funcionario.getEmail();
		cpfCnpj = funcionario.getCpfCnpj();
		sexo = funcionario.getSexo();
		endereco = new EnderecoDTO(funcionario.getEndereco());
		profissao = new ProfissaoDTO(funcionario.getProfissao());
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public EnderecoDTO getEndereco() {
		return endereco;
	}

	public void setEndereco(EnderecoDTO endereco) {
		this.endereco = endereco;
	}

	public Endereco fromEndereco(EnderecoDTO enderecoDto) {
		return new Endereco(enderecoDto.getRua(), enderecoDto.getNumero(), enderecoDto.getCidade(),
				enderecoDto.getEstado(), enderecoDto.getPais(), enderecoDto.getCep());
	}

	public Profissao fromProfissao(ProfissaoDTO profissaoDto) {
		return new Profissao(profissaoDto.getId(), profissaoDto.getNome(), profissaoDto.getSalarioMedio());

	}

	public ProfissaoDTO getProfissao() {
		return profissao;
	}

	public void setProfissao(ProfissaoDTO profissao) {
		this.profissao = profissao;
	}

	public String getTelefone1() {
		return telefone1;
	}

	public void setTelefone1(String telefone1) {
		this.telefone1 = telefone1;
	}

	public String getTelefone2() {
		return telefone2;
	}

	public void setTelefone2(String telefone2) {
		this.telefone2 = telefone2;
	}

	public String getTelefone3() {
		return telefone3;
	}

	public void setTelefone3(String telefone3) {
		this.telefone3 = telefone3;
	}

	
}
