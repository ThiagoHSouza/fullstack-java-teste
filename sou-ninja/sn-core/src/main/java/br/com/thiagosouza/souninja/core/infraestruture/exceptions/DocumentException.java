package br.com.thiagosouza.souninja.core.infraestruture.exceptions;

class DocumentException extends Exception {
    private static final long serialVersionUID = 1149241039409861914L;

    public DocumentException(String msg){
        super(msg);
    }

    public DocumentException(String msg, Throwable cause){
        super(msg, cause);
    }
}
