package br.com.thiagosouza.souninja.core.domain.businessObject;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import br.com.thiagosouza.souninja.core.domain.entity.Product;
import br.com.thiagosouza.souninja.core.domain.repository.ProductRepository;

@Stateless
public class ProductBO {
	
	@Inject
	ProductRepository productRepository;	
	
	public Product registerClient(Product product) throws Exception{
		return productRepository.insert(product);
	}
	
	public Product editClient(Product product) throws Exception{
		return productRepository.update(product);
	}
	
	public void deleteClient(Product product){
		productRepository.remove(product);
	}
	
	public Product findClientById(Long id){
		return productRepository.findById(id);
	}
	
	public List<Product> findAll(){
		return productRepository.findAll();
	}
	

	public void removeProduct(Long idClient) {
		productRepository.remove(idClient);
	}
	
	
	

}
