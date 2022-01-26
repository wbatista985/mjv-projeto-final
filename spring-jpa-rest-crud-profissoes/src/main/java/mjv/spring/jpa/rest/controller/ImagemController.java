package mjv.spring.jpa.rest.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import mjv.spring.jpa.rest.model.Funcionario;
import mjv.spring.jpa.rest.model.Imagem;
import mjv.spring.jpa.rest.service.FuncionarioService;
import mjv.spring.jpa.rest.service.ImagemService;

@RestController
@RequestMapping("/imagem")
@CrossOrigin
public class ImagemController {

    @Autowired
    ImagemService imagemService;

    @Autowired
    FuncionarioService funcionarioService;
    
	@PostMapping(path= "/upload/{id}")
    Long uploadImage(@RequestParam("file") MultipartFile multipartImage, @PathVariable Integer id) throws Exception {
		Funcionario funcionario = funcionarioService.buscarFuncionarioPorId(id);
		Imagem imagem = imagemService.uploadImage(multipartImage);
		funcionario.setImagem(imagem);
		funcionarioService.atualizarFuncionario(funcionario);
		return imagem.getId();
    }
	
	@GetMapping(value = "/download/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
	public Resource downloadImage(@PathVariable Integer id) {
		Funcionario funcionario = funcionarioService.buscarFuncionarioPorId(id);
	   return imagemService.downloadImage(funcionario.getImagem());
	}
}	