package br.com.thiagosouza.souninja.core.domain.repository;

import javax.enterprise.context.Dependent;

import br.com.thiagosouza.souninja.core.domain.entity.Order;
import br.com.thiagosouza.souninja.core.infraestruture.jpa.AbstractRepository;

@Dependent
public class OrderRepository  extends AbstractRepository<Order> {
	public OrderRepository(){
		
	}
}

