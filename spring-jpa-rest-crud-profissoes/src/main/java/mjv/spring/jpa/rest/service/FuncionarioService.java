package mjv.spring.jpa.rest.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import mjv.spring.jpa.rest.dto.FuncionarioDTO;
import mjv.spring.jpa.rest.model.Funcionario;
import mjv.spring.jpa.rest.repository.FuncionarioRepository;
import mjv.spring.jpa.rest.service.exceptions.ObjectNotFoundException;

@Service
public class FuncionarioService {
	@Autowired
	private FuncionarioRepository funcionarioRepository;

	public List<Funcionario> listarFuncionarios() {
		return funcionarioRepository.findAll();
	}

	public Funcionario buscarFuncionarioPorId(Integer id) {
		Optional<Funcionario> funcionarioExistente = funcionarioRepository.findById(id);

		return funcionarioExistente.orElseThrow(() -> new ObjectNotFoundException(
				"Funcionario não encontrado! Id: " + id + ", Tipo: " + Funcionario.class.getName()));
	}

	public Funcionario buscarFuncionario(Funcionario funcionario) {
		Optional<Funcionario> funcionarioExistente = funcionarioRepository.findById(funcionario.getId());

		return funcionarioExistente.orElseThrow(() -> new ObjectNotFoundException(
		"Funcionario não encontrado! Id: " + funcionario.getId() + 
		", Tipo: " + Funcionario.class.getName()));
	}

	public Funcionario inserirFuncionario(Funcionario funcionario) {
		funcionario.setId(null);
		return funcionarioRepository.save(funcionario);
	}

	public void atualizarFuncionario(Funcionario funcionario) {
		Funcionario funcionarioExiste = buscarFuncionario(funcionario);

		if (funcionarioExiste != null) {
			funcionarioRepository.save(funcionario);
		}
	}

	public void deletarFuncionario(Integer id) {
		Funcionario funcionarioExiste = buscarFuncionarioPorId(id);
		if (funcionarioExiste != null) {
			funcionarioRepository.delete(funcionarioExiste);
		}
	}

	public Funcionario fromDTO(FuncionarioDTO objDto) {
		Funcionario funcionario = new Funcionario(objDto.getId(), objDto.getNome(), objDto.getEmail(),
				objDto.getCpfCnpj(), objDto.getSexo(), objDto.fromEndereco(objDto.getEndereco()),
				objDto.fromProfissao(objDto.getProfissao())

		);
		Set<String> telefones = new HashSet<String>();
		telefones.add(objDto.getTelefone1());
		if (objDto.getTelefone2() != null) {
			telefones.add(objDto.getTelefone2());
		}
		if (objDto.getTelefone3() != null) {
			telefones.add(objDto.getTelefone3());
		}
		funcionario.setTelefones(telefones);
		return funcionario;
	}

}
