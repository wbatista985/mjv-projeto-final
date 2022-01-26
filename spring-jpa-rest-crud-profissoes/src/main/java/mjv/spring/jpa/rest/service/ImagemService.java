package mjv.spring.jpa.rest.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import mjv.spring.jpa.rest.model.Imagem;
import mjv.spring.jpa.rest.repository.ImagemRepository;

@Service
public class ImagemService {

	@Autowired
	ImagemRepository imagemRepository;

	public Imagem uploadImage(MultipartFile multipartImage) throws Exception {
		Imagem dbImage = new Imagem();
		dbImage.setName(multipartImage.getName());
		dbImage.setContent(multipartImage.getBytes());
		return imagemRepository.save(dbImage);
	}
	
	public Resource downloadImage(Imagem imagem) {
	    byte[] image = imagem.getContent();
	    return new ByteArrayResource(image);
	}
}
