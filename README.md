   # Final challenge using java language<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="40" height="40"/> </a>
<div style="display: inline_block">
Performing Employee registration project and connecting Backend with Frontend  <img  align="center" alt="html5" src="https://img.shields.io/static/v1?label=DevSchool&message=MJV&color=blueviolet"/>  <a href="https://www.java.com" target="_blank"> 
  
  #### Authors
- [Wagner dos Santos ](https://github.com/wbatista985)

#### Course offered by MJV technology and inovation
- [ MJV ](https://www.mjvinnovation.com/pt-br/)

#### Instructor
- [ Glayson sampaio ](https://github.com/glysns)

   
## Requirements

For building and running the application you need:

- [Spring Boot](http://maven.apache.org/download.cgi)
- [Maven](http://maven.apache.org/download.cgi)
- [PostgresSQL](http://maven.apache.org/download.cgi)
- [JPA](http://maven.apache.org/download.cgi)
- [Spring Framework](http://maven.apache.org/download.cgi)

# Backend
   
## Running

First, clone the project and build locally:

```shell
https://github.com/wbatista985/mjv-projeto-final.git
```

Make sure you have a PostgresSQL database called "postgres".

From project root directory run:

```shell
spring-boot:run
```
### Class model Funcionário
We have an API written in Java, using the Spring framework which is used to register employees.
For our application to work, it is necessary for employees to register in the system. Each employee is represented by the following class:

```
  
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
	
	@ElementCollection
	@CollectionTable(name = "telefones")
	private Set<String> telefones = new HashSet<String>();

  
```

- `@Entity`: Our cadastro class is an entity that will be mapped to our database.
  Usamos @ElementCollectionanotação para declarar um mapeamento de coleção de elementos. Todos os registros da coleção são armazenados em uma tabela separada. A configuração para esta tabela é especificada usando a @CollectionTableanotação.

A @CollectionTableanotação é usada para especificar o nome da tabela que armazena todos os registros da coleção 

 
- `@Id/@GeneratedValue`: The annotated attribute will be the primary key of the table and will be generated automatically using the IDENTITY strategy.
   
- `@ElementCollection`: The use @ElementCollection the  annotation to declare an element collection mapping. All records in the collection are stored in a separate table. The configuration for this table is specified using the @CollectionTable annotation.
Can be used to define a one-to-many relationship to an Embeddable object, or a Basic value (such as a collection of Strings). An ElementCollection can also be used in combination with a Map to define relationships where the key can be any type of object, and the value is an Embeddable object or a Basic
   
- `@CollectionTable`: The @CollectionTable annotation is used to specify the name of the table that stores all the records in the collection
### We have our FuncionarioController 
   
```   

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

   
   
```
- `@RestController`: Indicates that this controller by default will respond using the JSON format by default.  
   
- `@RequestMapping`: We use it to map the urls of our methods, in this case, all the methods of this controller will be based on “/cadastros”
   
- `@Autowired`: With this annotation we indicate that our constructor parameters will be injected
   
- `@GetMapping`: to map HTTP GET requests to specific handler methods.
   
- `@PostMapping`: We just mapped our save method. This method will be invoked when the url: /cadastros, using the POST method, is accessed.
   
- `@PutMapping`: This annotation is used to map HTTP PUT requests to specific handler methods.
   
- `@DeleteMapping`: is a composite annotation that acts as a shortcut to @RequestMapping ( method =RequestMethod . DELETE )
   
- `@RequestBody`: We indicate that the cadastro object has to be fetched in the request body.@RequestBody indicates that a method parameter must be bound to the      HTTP request body value. The HttpMessageConveter is responsible for converting the HTTP request message to the object.
   
- `@PathVariable`: This annotation is used to annotate the request handler method arguments. The @RequestMapping annotation can be used to handle dynamic changes    to the URI, where a given URI value acts as a parameter.
   
- `@CrossOrigin`: @CrossOrigin anotação para habilitar o CORS nele (por padrão, permite todas as origens e os métodos HTTP especificados na @RequestMapping anotação
   
### To access our database we have the FuncionarioRepository class:
   
  
   
```
   public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> {

   }
   
```
It makes the framework see our class and we indicate that it is a repository, that is, a class whose only function is to access the database.
   
### Let's look at our service class and see how it accomplishes the task of saving a new user:
     
```
   
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
		"Funcionario não encontrado! Id: " + funcionario.getId() + ", Tipo: " + Funcionario.class.getName()));
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

   
```
- `@Service`: We use this annotation for the framework to see our class and indicate that this class is a service.

### Data Transfer Object – DTO
	
The name itself says a lot: a simple object used to transfer data from one place to another in the application, without business logic in its objects and commonly associated with the transfer of data between a view layer and another of the persistence of the data (model layer). Very often you will see this pattern being used in conjunction with a DAO.

This pattern is also widely used when you don't want to expose the persistence layer, but you need to display the same data in the presentation layer. For example, consider an application screen that needs to list the data of 10 people registered in a table. To access this data, the persistence layer does so with the listing configured in an ArrayList of 10 PO's (see pattern above). To pass these values to the screen, the same list must first be converted to a list of DTO's with the same attributes and get's/set's methods. All this because the same application makes use of JPA, for example, or Hibernate and the same frameworks do not allow data considered “lazy” to persist until after the connection has been closed. For this reason, the conversion is necessary so that the data can travel without being lost or without any connection error happening.

- [Link example dto project ](https://www.devmedia.com.br/diferenca-entre-os-patterns-po-pojo-bo-dto-e-vo/28162#:~:text=Data%20Transfer%20Object%20%E2%80%93%20DTO&text=Esse%20padr%C3%A3o%20tamb%C3%A9m%20%C3%A9%20bastante,pessoas%20cadastradas%20em%20uma%20tabela.)

Note: design patterns should also not be used to the detriment of the environment where you are running the same project, the idea is that they are abstract enough to adapt, but you will be the main author of this, so don't disregard the environment in the time to think of all the adaptable scenarios.
   
# Frontend
	
<img  align="center" alt="" src="https://i.imgur.com/MtH61PG.png"/>
</div><br/>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
