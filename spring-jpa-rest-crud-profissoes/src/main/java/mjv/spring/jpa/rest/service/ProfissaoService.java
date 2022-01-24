package mjv.spring.jpa.rest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mjv.spring.jpa.rest.model.Profissao;
import mjv.spring.jpa.rest.repository.ProfissaoRepository;

@Service
public class ProfissaoService {
	
	@Autowired
	private ProfissaoRepository profissaoRepository;
	
	public Profissao inserirProfissao(Profissao profissao) {
		profissao.setId(null);
		return profissaoRepository.save(profissao);
	}
}
