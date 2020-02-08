//Importando o express
const express = require('express');

// Chamando o express
const server = express();

// Informando ao "server" que vai ser utilizado formato JSON
server.use(express.json());

/*Tipos de Requisições
Query params = ?teste=1  -> req.query
Route params = /usesrs/1 -> req.params
Request body = { "name": "Ivanildo", "email": "ivanildo.sil.barros@gmail.com" }
*/

//Vamos utilizar o conceito CRUD - Create, Read, Update,, Delete

//Vetor para podermos manipular os dados.
const users = ['Ivanildo', 'Peterson', 'Jose', 'Anderson', 'Karine']

//Middleware Global(É chamado antes de qualquer outra chamada)
server.use((req, res, next) => { //next (para seguir o fluxo da aplicação)
  return next();
});

//Middleware Verifica se ("name") está certo
function checkUserExists(req, res, next) {
  if (!req.body.name) {//Caso a req(name) esteja com o nome diferente  

    //retorna mensagem de erro                      
    return res.status(400).json({ error: 'User name is required' });
  }
  return next();//Segue o fluxo
};

// Middleware Verifica se existe o usuário
function checkUserInArray(req, res, next) {

  //user recebe o valor do index (valor informado pela requisição)
  const user = users[req.params.index];

  if (!user) {//Caso o usuário não exista retorna a mensagem
    return res.status(400).json({ error: 'User does not exists' });
  }
  //Caso exista, minha reqisição (req.user) é o usuário encontrado no vetor
  req.user = user;
  return next();//segue o fluxo da aplicação
}

//Lista todos os usuários
server.get('/users', (req, res) => {

  return res.json(users);//Retorna todos os usuários
});

/*Busca um usuário específico, estamos passando os Middleware(checkUserInArray, 
checkUserExists) para para termos certeza que existe o usuário ou
o name está correto.
*/
server.get('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;//desestruturando o index informado na rota

  return res.json(users[index]);
  //Retorna o nome no usuário, 
})

//Cria um novo usuário
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;//desestruturando o name informado pelo body
  users.push(name);//push -> grava no vetor o novo usuário

  return res.json(users);
  //Retorna a nova lista de usuário
});

//Altera o usuario
server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {

  // utilizando o modo de desestruturação req.params
  const { index } = req.params;

  //Guardando o name do req.body
  const { name } = req.body;
  users[index] = name;//Usuário referente ao index informado

  return res.json(users);
  //retorna a lista atualizada de usuários
});

//Remove um usuário
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  /*splice percorre o vetor até o index e recorta a posição informada, 
  1 é a quantidade que deseja retirar a partir do index,
  (se por exemplo informar 2, recortaria a posição do index e a proxima).*/
  users.splice(index, 1);

  //Retorna a lista atualizada
  return res.json(users);
});

//Executando na porta 3000
server.listen(3000);