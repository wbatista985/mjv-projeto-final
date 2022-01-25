package mjv.spring.jpa.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mjv.spring.jpa.rest.dto.ProfissaoDTO;
import mjv.spring.jpa.rest.model.Profissao;
import mjv.spring.jpa.rest.service.ProfissaoService;

@RestController
@RequestMapping("/profissao")
@CrossOrigin
public class ProfissaoController {
	@Autowired
	private ProfissaoService profissaoService;
	
	@PostMapping(path="/inserir") 
	public ResponseEntity<Profissao> inserir(@RequestBody Profissao profissao ) {
		Profissao novaProfissao = profissaoService.inserirProfissao(profissao);
		return ResponseEntity.ok().body(novaProfissao);
	}
	
	@PutMapping(path = "/atualizar")
	public ResponseEntity<Profissao> atualizar(
			@RequestBody ProfissaoDTO profissaoDto) {
		Profissao profissao = profissaoService.fromDTO(profissaoDto);
		profissaoService.atualizarProfissao(profissao);
		Profissao funcionarioAtualizado = profissaoService.buscarProfissao(profissao);
		return ResponseEntity.ok().body(funcionarioAtualizado);
	}

}
