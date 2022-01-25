package mjv.spring.jpa.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mjv.spring.jpa.rest.dto.FuncionarioDTO;
import mjv.spring.jpa.rest.model.Funcionario;
import mjv.spring.jpa.rest.service.FuncionarioService;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin
public class FuncionarioController {
	@Autowired
	private FuncionarioService funcionarioService;

	@GetMapping(path = "/listar")
	public ResponseEntity<List<Funcionario>> listar() {
		List<Funcionario> funcionarios = funcionarioService.listarFuncionarios();
		return ResponseEntity.ok().body(funcionarios);
	}

	@PostMapping(path = "/inserir")
	public ResponseEntity<Funcionario> inserir(@RequestBody FuncionarioDTO funcionarioDto) {
		Funcionario funcionario = funcionarioService.fromDTO(funcionarioDto);
		Funcionario novoFuncionario = funcionarioService.inserirFuncionario(funcionario);
		return ResponseEntity.ok().body(novoFuncionario);
	}

	@PutMapping(path = "/atualizar")
	public ResponseEntity<Funcionario> atualizar(
			@RequestBody FuncionarioDTO funcionarioDto) {
		Funcionario funcionario = funcionarioService.fromDTO(funcionarioDto);
		funcionarioService.atualizarFuncionario(funcionario);
		Funcionario funcionarioAtualizado = funcionarioService.buscarFuncionario(funcionario);
		return ResponseEntity.ok().body(funcionarioAtualizado);
	}

	@DeleteMapping(path= "/deletar/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Integer id) {
		funcionarioService.deletarFuncionario(id);
		return ResponseEntity.noContent().build();
	}
}
