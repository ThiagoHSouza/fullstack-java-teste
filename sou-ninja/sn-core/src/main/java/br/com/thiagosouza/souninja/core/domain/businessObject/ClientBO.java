package br.com.thiagosouza.souninja.core.domain.businessObject;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.dom4j.DocumentException;

import br.com.thiagosouza.souninja.core.domain.entity.Client;
import br.com.thiagosouza.souninja.core.domain.repository.ClientRepository;
import br.com.thiagosouza.souninja.core.infraestruture.util.ValidateDocument;

@Stateless
public class ClientBO {
	
	@Inject
	ClientRepository clientRepository;
	
	public Client registerClient(Client client) throws DocumentException, Exception{
		client.setDocumentNumber(validateDocument(client.getDocumentNumber()));
		return clientRepository.insert(client);
	}
	
	public Client editClient(Client client) throws Exception{
		client.setDocumentNumber(validateDocument(client.getDocumentNumber()));
		return clientRepository.update(client);
	}

	public Client findByDocumentNumber(String documentNumber) throws DocumentException, Exception {
		documentNumber = validateDocument(documentNumber);
		return clientRepository.getByDocumentNumber(documentNumber);
	}
	
	public void deleteClient(Client client){
		clientRepository.remove(client);
	}
	
	public Client findClientById(Integer id){
		return clientRepository.findById(new Long(id));
	}
	
	public List<Client> findAll(){
		return clientRepository.findAll();
	}
	
	private String validateDocument(String documentNumber) throws DocumentException {
		documentNumber = documentNumber.replaceAll("[\\D]", "");
		if(documentNumber.length() < 14){
			if(!ValidateDocument.isCPF(documentNumber)){
				throw new DocumentException("CPF inválido");
			}else{
				return ValidateDocument.imprimeCPF(documentNumber);
			}
		}else{
			if(!ValidateDocument.isCNPJ(documentNumber)){
				throw new DocumentException("CNPJ inválido");
			}else{
				return ValidateDocument.imprimeCNPJ(documentNumber);
			}			
		}
	}

	public void removeClient(Long idClient) {
		clientRepository.remove(idClient);
	}
	

}
