package mjv.spring.jpa.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mjv.spring.jpa.rest.model.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> {

}
