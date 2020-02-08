# api-rest

# Utilizando-api-rest

Utilização básica de uma api-rest com CRUD (Create, Read, Update, Delete)

Feature da API:
- Listar todos os usuários.
- Listar um usuário específico.
- Criar usuários que será armazenado em um vetor predefinido com cinco elementos.
- Editar usuários.
- Deletar usuários.


<h3>Dependências:</h3> "express": "^4.17.1", "nodemon": "^2.0.2"

Scripts: "scripts": {
    "dev" :  "nodemon index.js"
  }
  
<p>Baixar api: <pre><code>$ git clone https://github.com/ivanildobarros/api-rest
</code></pre></p>

<p>Acessar diretório: <pre><code>$ cd api-rest
</code></pre></p>

<h4>Instalando o gerenciador de pacotes yarn ou pode utilizar o npm:</h4>
https://classic.yarnpkg.com/en/docs/install

<h4>Instalando express:</h4>
<pre><code>$ yarn add express</code></pre></p>

<h4>Instalando nodemon:</h4>
<pre><code>$ yarn add nodemon -D</code></pre></p>

<h4>Iniciando nossa api:</h4>
<pre><code>$ yarn dev</code></pre></p> ou <pre><code>$ node index.js</code></pre></p>

<strong>Testando nossa api atráves do Insomnia.</strong>
* Listar todos os usuários, GET:http://localhost:3000/users -> No Body

* Listar um usuário específico, GET:http://localhost:3000/users/1 -> No Body
(O número informado é a posição do index, lembrando que inicia com 0)

* Criar usuário, POST: http://localhost:3000/users -> JSON
{
	"name" : "Teste",
	"email" : "teste@teste"
}

* Editar usuário, PUT:http://localhost:3000/users/1 -> {
	"name": "teste"
}

* Deletar usuário, DELETE:http://localhost:3000/users/0 -> No Body













