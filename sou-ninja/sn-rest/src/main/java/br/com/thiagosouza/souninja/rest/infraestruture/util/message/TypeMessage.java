package br.com.thiagosouza.souninja.rest.infraestruture.util.message;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum TypeMessage {
	ERROR(0),
	SUCCESS(1);
	
	private Integer id;
	
	private TypeMessage(Integer id) {
		this.id = id;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	@JsonCreator
	public static TypeMessage fromCodigo( Integer id ){		
		for ( TypeMessage tipo : values() ){			
			if ( tipo.getId().equals(id) ){
				return tipo;
			}
		}		
		return null;
	}


}

