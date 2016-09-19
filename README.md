# A PROPOSTA #

O sistema de controle de Ordens de compra foi desenvolvido afim de atender todos os critérios da proposta apresentada. Para começar a manusear o sistema, o usuário deverá primeiramente realizar o cadastro completo de Clientes e outro para Produtos que poderão ser feitos no menu "Controle de Clientes" e "Controle de Produtos" respectivamente. Ambos os formulários têm como obrigatório o preenchimento de todos os campos, sendo que o formulário de clientes ainda tem a validação de número de documento, o mesmo deve ser válido e único.
Após cadastrar os clientes e os produtos o usuário poderá ir ao menu "Realizar Compra" para adicionar os itens ao carrinho. Quando desejar, poderá ir até o menu "Carrinho de Compra", inserir o cliente responsável pelo pedido, e então finalizar a compra. No menu "Lista de Compras" o usuário poderá consultar e editar qualquer pedido realizado anteriormente.

Para facilitar a visualização do sistema, foi utilizado o servidor da OpenShift.
Para acessar clique aqui: [DEMO](link).



# O PROJETO #

O Projeto foi desenvolvido em JAVA utilizando o servidor de aplicação Wildfly 8.2.1, gerenciamento de dependências Maven e banco de dados MySQL com JPA para o backend. Já no frontend foi utilizado HTML5, CSS3 e JS com o apoio do AngularJS, Angular Material, uiRouter e outras diretivas externas para agilizar o desenvolvimento.

Para criar o ambiente, será necessário a instalação do servidor wildFly 8.2.1, o pacote que se encontra neste repositório já está configurado com o driver do MySQL e o DataSource, caso seja necessário alterar alguma configuração do banco poderá ser feito diretamente dentro do arquivo "standalone-sou-ninja.xml" ou pelo localhost:9990/console/App.html#datasources após ser inicializado o servidor.

```xml
<datasource jta="true" jndi-name="java:jboss/datasources/souninja" pool-name="souninja" enabled="true" use-java-context="true" use-ccm="true">
    <connection-url>jdbc:mysql://localhost:3306/souninja</connection-url>
    <driver>mysql</driver>
    <transaction-isolation>TRANSACTION_READ_COMMITTED</transaction-isolation>
    <pool>
        <min-pool-size>10</min-pool-size>
        <max-pool-size>100</max-pool-size>
        <prefill>true</prefill>
    </pool>
    <security>
        <user-name>root</user-name>
        <password>root</password>
    </security>
    <statement>
        <prepared-statement-cache-size>32</prepared-statement-cache-size>
        <share-prepared-statements>true</share-prepared-statements>
    </statement>
</datasource>
```
# ARQUITETURA DO SISTEMA #

A proposta foi desenvolvida em três projetos (sn-core, sn-rest e sn-web).
O Core foi subdividido em dois packets príncipais (Domain e Infraestruture). O Domain é responsável por toda a regra de negócio e query de persistência específicas. A maior parte das query (CRUD) estão alocadas dentro do Infraestruture no pacote JPA numa classe abstrata que é responsável por prover os métodos básicos do crud à qualquer tipo de classe.
O projeto REST é o responsável por escutar as chamadas HTTP. Ele possui como dentre as dependências, o projeto CORE, o qual será encaminhado as requisições para serem tratadas.
Já o WEB carrega todo o projeto web. As dependências foram colocadas diretamente dentro da pasta "dist", não foi utilizado o Bower, NPM e nem nenhum outra ferramenta de repositório a fim de facilitar a instalação do ambiente para o projeto.

![CSCore Logo](https://s3.amazonaws.com/dev.static.status.life/arquitetura.PNG)




