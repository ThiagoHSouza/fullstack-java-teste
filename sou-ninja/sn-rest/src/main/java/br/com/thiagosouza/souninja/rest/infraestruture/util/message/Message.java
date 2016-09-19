package br.com.thiagosouza.souninja.rest.infraestruture.util.message;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

public class Message {
	
	private TypeMessage type;
	private String message;
		
	public Message(String string) {
		super();
		this.message = string;
	}
	
	public static Response getResponseInternalServerError(){
		return getResponse(Status.INTERNAL_SERVER_ERROR, "Erro no servidor, desculpe pelo incoveniente.");
	}
	
	public static Response getResponse(Status status, String message){	
		Message m = new Message(message);
		if(status != Status.OK){
			m.type = TypeMessage.ERROR;
			m.message = "Erro: " + message;
		}else{
			m.type = TypeMessage.SUCCESS;
			m.message = message;
		}
		return Response.status(status).entity(m).build();
	}

	public TypeMessage getType() {
		return type;
	}
	
	public void setType(TypeMessage type) {
		this.type = type;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}

}

