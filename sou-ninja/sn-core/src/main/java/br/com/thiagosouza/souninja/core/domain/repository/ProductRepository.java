package br.com.thiagosouza.souninja.core.domain.repository;

import javax.enterprise.context.Dependent;

import br.com.thiagosouza.souninja.core.domain.entity.Product;
import br.com.thiagosouza.souninja.core.infraestruture.jpa.AbstractRepository;

@Dependent
public class ProductRepository  extends AbstractRepository<Product> {
	public ProductRepository() {
		
	}
}
