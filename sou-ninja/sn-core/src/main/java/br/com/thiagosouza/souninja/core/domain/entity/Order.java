package br.com.thiagosouza.souninja.core.domain.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import br.com.thiagosouza.souninja.core.infraestruture.jsonConverter.LocalDateDeserializer;
import br.com.thiagosouza.souninja.core.infraestruture.jsonConverter.LocalDateSerializer;

@Entity
@Table(name = "purchase_order")
public class Order {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id_order")
	private Long idOrder;
	
	@JsonDeserialize(using = LocalDateDeserializer.class)  
	@JsonSerialize(using = LocalDateSerializer.class)  
	@Column(name="date_issue")
	private LocalDate dateIssue;
	
	@Column(name="total_value")
	private BigDecimal totalValue;
	
	@OneToOne
	@JoinColumn(name = "fk_id_client", foreignKey = @ForeignKey(name = "fk_id_client"))
	private Client client;
	
	@OneToMany(mappedBy = "order", fetch = FetchType.EAGER, cascade=CascadeType.ALL)
	private List<ProductOrder> productList;

	public Long getIdOrder() {
		return idOrder;
	}

	public void setIdOrder(Long idOrder) {
		this.idOrder = idOrder;
	}

	public LocalDate getDateIssue() {
		return dateIssue;
	}

	public void setDateIssue(LocalDate dateIssue) {
		this.dateIssue = dateIssue;
	}

	public BigDecimal getTotalValue() {
		return totalValue;
	}

	public void setTotalValue(BigDecimal totalValue) {
		this.totalValue = totalValue;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		if(client != null){
			List<Order> orderList = new ArrayList<Order>();
			orderList.add(this);
			client.setOrder(orderList);			
		}
		this.client = client;
	}

	public List<ProductOrder> getProductList() {
		return productList;
	}

	public void setProductList(List<ProductOrder> productList) {
		if(productList != null && productList.size()>0){
			for (ProductOrder productOrder : productList) {
				productOrder.setOrder(this);				
			}
		}
		this.productList = productList;
	}


	
	
	
}
