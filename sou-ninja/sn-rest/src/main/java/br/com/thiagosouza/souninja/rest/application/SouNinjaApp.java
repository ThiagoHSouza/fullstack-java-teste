package br.com.thiagosouza.souninja.rest.application;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import br.com.thiagosouza.souninja.rest.application.interceptors.CORSFilter;
import br.com.thiagosouza.souninja.rest.application.resource.ClientResource;
import br.com.thiagosouza.souninja.rest.application.resource.OrderResource;
import br.com.thiagosouza.souninja.rest.application.resource.ProductResource;

@ApplicationPath("api")
public class SouNinjaApp extends Application {
	
	@Override
	public Set<Class<?>> getClasses() {
		Set<Class<?>> classes = new HashSet<Class<?>>();
		classes.add( CORSFilter.class );	
		classes.add( OrderResource.class );
		classes.add( ClientResource.class );
		classes.add( ProductResource.class );
				
		return classes;
	}
}
