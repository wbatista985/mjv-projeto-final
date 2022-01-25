package mjv.spring.jpa.rest.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mjv.spring.jpa.rest.dto.ProfissaoDTO;
import mjv.spring.jpa.rest.model.Profissao;
import mjv.spring.jpa.rest.repository.ProfissaoRepository;
import mjv.spring.jpa.rest.service.exceptions.ObjectNotFoundException;

@Service
public class ProfissaoService {

	@Autowired
	private ProfissaoRepository profissaoRepository;

	public Profissao buscarProfissao(Profissao profissao) {
		Optional<Profissao> profissaoExistente = profissaoRepository.findById(profissao.getId());

		return profissaoExistente.orElseThrow(() -> new ObjectNotFoundException(
				"Profissão não encontrado! Id: " + profissao.getId() + ", Tipo: " + Profissao.class.getName()));
	}

	public Profissao inserirProfissao(Profissao profissao) {
		profissao.setId(null);
		return profissaoRepository.save(profissao);
	}

	public void atualizarProfissao(Profissao profissao) {
		Profissao funcionarioExiste = buscarProfissao(profissao);

		if (funcionarioExiste != null) {
			profissaoRepository.save(profissao);
		}
	}

	public Profissao fromDTO(ProfissaoDTO objDto) {
		Profissao profissao = new Profissao(objDto.getId(), objDto.getNome(), objDto.getSalarioMedio());

		return profissao;
	}
}
