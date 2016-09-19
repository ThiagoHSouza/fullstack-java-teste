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
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.dom4j.DocumentException;

import br.com.thiagosouza.souninja.core.domain.businessObject.ProductBO;
import br.com.thiagosouza.souninja.core.domain.entity.Product;
import br.com.thiagosouza.souninja.rest.infraestruture.util.message.Message;

@Path("product")
@Consumes({ MediaType.APPLICATION_JSON })
@Produces({ MediaType.APPLICATION_JSON })
public class ProductResource {	
	
	@EJB
	ProductBO productBo;
	
	@POST
	public Response registerClient(Product product){
		try {
			return Response.ok(productBo.registerClient(product)).build();
		} catch (DocumentException e) {
			return Message.getResponse(Status.BAD_REQUEST, e.getMessage());
		} catch (Exception e) {
			return Message.getResponseInternalServerError();
		}
	}
	
	@PUT
	public Response editClient(Product product){
		try {
			return Response.ok(productBo.editClient(product)).build();
		} catch (DocumentException e) {
			return Message.getResponse(Status.BAD_REQUEST, e.getMessage());
		} catch (Exception e) {
			return Message.getResponseInternalServerError();
		}
	}
	
	@DELETE
	@Path("{idProduct}")
	public Response removeClient(@PathParam("idProduct") Long idProduct){
		try {
			productBo.removeProduct(idProduct);
			return Message.getResponse(Status.OK, "Cliente removido com sucesso.");
		} catch (Exception e) {
			return Message.getResponseInternalServerError();
		}
	}
	
	@GET
	public Response findAll(){
		try {
			return Response.ok(productBo.findAll()).build();
		} catch (Exception e) {
			return Message.getResponseInternalServerError();
		}
	}
	

}

