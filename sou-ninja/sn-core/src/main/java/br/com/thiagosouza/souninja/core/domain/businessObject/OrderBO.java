package br.com.thiagosouza.souninja.core.domain.businessObject;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import br.com.thiagosouza.souninja.core.domain.entity.Order;
import br.com.thiagosouza.souninja.core.domain.entity.ProductOrder;
import br.com.thiagosouza.souninja.core.domain.repository.OrderRepository;

@Stateless
public class OrderBO {
	
	@Inject
	private OrderRepository orderRepository;
	
	public Order launchPurchase(Order order) throws Exception{
		order.setDateIssue(LocalDate.now());
		order.setTotalValue(calculateTotal(order.getProductList()));
		
		return orderRepository.insert(order);		
	}
	
	private BigDecimal calculateTotal(List<ProductOrder> list){
		BigDecimal totalValue = BigDecimal.ZERO;
		for (ProductOrder productOrder: list) {
			BigDecimal amount = new BigDecimal(productOrder.getAmount());
			totalValue = totalValue.add(productOrder.getProduct().getUnitaryValue().multiply(amount));
		}
		return totalValue;
		
	}
	
	public Order modifyPuschase(Order order) throws Exception{
		order.setTotalValue(calculateTotal(order.getProductList()));
		return orderRepository.update(order);	
	}
	
	public void deleteOrder(Long idOrder){
		orderRepository.remove(idOrder);		
	}
	
	public List<Order> getListOrder(){
		return orderRepository.findAll();
	}
	
	public Order getByIdOrder(Integer id){
		return orderRepository.findById(new Long(id));
	}

	public Order update(Order order) {
		order.setTotalValue(calculateTotal(order.getProductList()));
		
		return orderRepository.update(order);
	}
	

}
