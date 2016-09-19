package br.com.thiagosouza.souninja.core.domain.entity;

import java.math.BigDecimal;
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
@Table(name = "product")
public class Product {

	@Id
	@GeneratedValue(strategy=GenerationType.TABLE)
	@Column(name="id_product")
	private Long idProduct;
	
	@Column(name="description")
	private String description;
		
	@Column(name="unitary_value")
	private BigDecimal unitaryValue;
	
	@JsonIgnore
	@OneToMany(mappedBy="product", fetch = FetchType.EAGER, cascade=CascadeType.ALL)
	private List<ProductOrder> order;

	public Long getIdProduct() {
		return idProduct;
	}

	public void setIdProduct(Long idProduct) {
		this.idProduct = idProduct;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getUnitaryValue() {
		return unitaryValue;
	}

	public void setUnitaryValue(BigDecimal unitaryValue) {
		this.unitaryValue = unitaryValue;
	}

	public List<ProductOrder> getOrder() {
		return order;
	}

	public void setOrder(List<ProductOrder> order) {
		this.order = order;
	}

	

	
	
}
