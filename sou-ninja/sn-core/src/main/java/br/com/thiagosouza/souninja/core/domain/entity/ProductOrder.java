package br.com.thiagosouza.souninja.core.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="productorder")
public class ProductOrder {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id_productorder")
	private Integer idProductOrder;
	
	@Column(name="amount_product")
	private Integer amount;
	
	@ManyToOne
	@JoinColumn(name = "fk_idproduct", foreignKey = @ForeignKey(name = "fk_idproduct"))
	private Product product;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "fk_idorder", foreignKey = @ForeignKey(name = "fk_idorder"))
	private Order order;

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public Integer getIdProductOrder() {
		return idProductOrder;
	}

	public void setIdProductOrder(Integer idProductOrder) {
		this.idProductOrder = idProductOrder;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}
	
	

}
