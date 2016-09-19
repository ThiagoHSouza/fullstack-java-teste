package br.com.thiagosouza.souninja.core.infraestruture.jpa;

import java.lang.reflect.ParameterizedType;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

public abstract class AbstractRepository<E> implements Repository<E> {

protected Class<E> entityType;
	
	@PersistenceContext(unitName="souninja")
	protected EntityManager entityManager;
	
	@SuppressWarnings("unchecked")
	public AbstractRepository() {
		
		ParameterizedType parameterizedType = (ParameterizedType) getClass().getGenericSuperclass();
		this.entityType = ( Class<E> ) parameterizedType.getActualTypeArguments()[0];
	}
		
	@Override
	public E insert(E entity) {
		this.entityManager.persist(entity);
		return entity;
	}

	@Override
	public E update(E entity) {
		return this.entityManager.merge(entity);
	}

	@Override
	public void remove(E entity) {
		this.entityManager.remove(entity);
	}

	@Override
	public void remove(Long id) {
		this.entityManager.remove( this.entityManager.getReference(this.entityType, id) );
	}

	@Override
	public E findById(Long id) {
		return this.entityManager.find(this.entityType, id);
	}
	
	@Override
	public List<E> findAll(){
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<E> query = builder.createQuery(this.entityType);
		query.from(this.entityType);
		return entityManager.createQuery(query).getResultList();
	}
}
