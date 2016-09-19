package br.com.thiagosouza.souninja.core.domain.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "client")
public class Client {
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE)
	@Column(name="id_client")
	private Long idClient;

	@Column(name="document_number", unique=true)
	private String documentNumber;

	@Column(name="name")
	private String name;

	@Column(name="phone")
	private String phone;

	@Column(name="email")
	private String email;
	
	@JsonIgnore
	@OneToMany(mappedBy = "client", fetch = FetchType.EAGER, cascade=CascadeType.ALL)
	private List<Order> order;

	public Long getIdClient() {
		return idClient;
	}

	public void setIdClient(Long idClient) {
		this.idClient = idClient;
	}

	public String getDocumentNumber() {
		return documentNumber;
	}

	public void setDocumentNumber(String documentNumber) {
		this.documentNumber = documentNumber;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Order> getOrder() {
		return order;
	}

	public void setOrder(List<Order> order) {
		this.order = order;
	}

	

}
