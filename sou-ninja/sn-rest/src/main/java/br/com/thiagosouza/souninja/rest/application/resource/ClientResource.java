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

import br.com.thiagosouza.souninja.core.domain.businessObject.ClientBO;
import br.com.thiagosouza.souninja.core.domain.entity.Client;
import br.com.thiagosouza.souninja.rest.infraestruture.util.message.Message;

@Path("client")
@Consumes({ MediaType.APPLICATION_JSON })
@Produces({ MediaType.APPLICATION_JSON })
public class ClientResource {	
	
	@EJB
	ClientBO clientBo;
	
	@POST
	public Response registerClient(Client client){
		try {
			return Response.ok(clientBo.registerClient(client)).build();
		} catch (DocumentException e) {
			return Message.getResponse(Status.BAD_REQUEST, e.getMessage());
		} catch (Exception e) {
			return Message.getResponseInternalServerError();
		}
	}
	
	@PUT
	public Response editClient(Client client){
		try {
			return Response.ok(clientBo.editClient(client)).build();
		} catch (DocumentException e) {
			return Message.getResponse(Status.BAD_REQUEST, e.getMessage());
		} catch (Exception e) {
			return Message.getResponseInternalServerError();
		}
	}
	
	@DELETE
	@Path("{idClient}")
	public Response removeClient(@PathParam("idClient") Long idClient){
		try {
			clientBo.removeClient(idClient);
			return Message.getResponse(Status.OK, "Cliente removido com sucesso.");
		} catch (Exception e) {
			return Message.getResponseInternalServerError();
		}
	}
	
	@GET
	public Response findAll(){
		try {
			return Response.ok(clientBo.findAll()).build();
		} catch (Exception e) {
			return Message.getResponseInternalServerError();
		}
	}
	
	@GET
	@Path("document-number/{documentNumber}")
	public Response verifyDocumentNumber(@PathParam("documentNumber") String documentNumber){
		try {
			Client client = clientBo.findByDocumentNumber(documentNumber);
			if(client != null){
				return Response.ok(client).build();				
			}else{
				return Message.getResponse(Status.NOT_FOUND, "Número de documento não encontrado.");
			}
		} catch (DocumentException e) {
			return Message.getResponse(Status.BAD_REQUEST, e.getMessage());
		} catch (Exception e) {
			return Message.getResponseInternalServerError();
		}
	}

}
