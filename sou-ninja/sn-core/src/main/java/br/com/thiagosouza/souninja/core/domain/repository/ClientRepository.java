package br.com.thiagosouza.souninja.core.domain.repository;

import javax.enterprise.context.Dependent;
import javax.persistence.TypedQuery;

import br.com.thiagosouza.souninja.core.domain.entity.Client;
import br.com.thiagosouza.souninja.core.infraestruture.jpa.AbstractRepository;

@Dependent
public class ClientRepository extends AbstractRepository<Client> {
	public ClientRepository() {

	}

	public Client getByDocumentNumber(String documentNumber) {
		try {
			String q = "select c from Client as c where c.documentNumber = :documentNumber";			
			TypedQuery<Client> query = entityManager.createQuery(q, Client.class);			
			query.setParameter("documentNumber", documentNumber);			
			return query.getSingleResult();			
		} catch (Exception e) {
			return null;
		}
	}
	

}
