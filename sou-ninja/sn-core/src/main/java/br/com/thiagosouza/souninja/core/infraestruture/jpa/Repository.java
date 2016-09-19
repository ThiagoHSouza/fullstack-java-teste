package br.com.thiagosouza.souninja.core.infraestruture.jpa;

import java.util.List;

public interface Repository<E> {

	public E insert( E entity );
	
	public E update( E entity );
	
	public void remove( E entity );
	
	public void remove ( Long id );
	
	public E findById( Long id );
	
	public List<E> findAll();
}
