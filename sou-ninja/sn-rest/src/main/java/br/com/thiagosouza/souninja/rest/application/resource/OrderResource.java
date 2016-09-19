package br.com.thiagosouza.souninja.rest.application.resource;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.thiagosouza.souninja.core.domain.businessObject.OrderBO;
import br.com.thiagosouza.souninja.core.domain.entity.Client;
import br.com.thiagosouza.souninja.core.domain.entity.Order;
import br.com.thiagosouza.souninja.rest.infraestruture.util.message.Message;

@Path("order")
@Consumes({ MediaType.APPLICATION_JSON })
@Produces({ MediaType.APPLICATION_JSON })
public class OrderResource {
	
	@EJB
	private OrderBO orderBo;
	
	@GET
	public Response getAll(){
		return Response.ok(orderBo.getListOrder()).build();
	}
	
	@GET
	@Path("id")
	public Response getById(@QueryParam("id") Integer id){		
		return Response.ok(orderBo.getByIdOrder(id)).build();
	}
	
	@PUT
	public Response putOrder(Order order){
		try {
			return Response.ok(orderBo.update(order)).build();			
		} catch (Exception e) {
			return Message.getResponse(Status.INTERNAL_SERVER_ERROR, e.getMessage());
		}		
	}
	
	@POST
	public Response postOrder(Order order){
		try {
			return Response.ok(orderBo.launchPurchase(order)).build();			
		} catch (Exception e) {
			return Message.getResponse(Status.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	
	@DELETE
	@Path("{idOrder}")
	public Response deleteOrder(@PathParam("idOrder")Long idOrder){
		orderBo.deleteOrder(idOrder);
		return Response.ok().build();
	}
	
	@GET
	@Path("model")
	public Response model(){
		Order order = new Order();
		order.setClient(new Client());
		return Response.ok(order).build();
	}
}
