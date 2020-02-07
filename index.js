const express = require('express');//Importando o express


const server = express(); // Chamando o express

server.use(express.json());// Informando ao SERVER que vai ser utilizado formato JSON
//Query params = ?teste=1  -> req.query
//Route params = /usesrs/1 -> req.params
//Request body = { "name": "Ivanildo", "email": "ivanildo@gmail.com" }

//CRUD - Create, Read, Update,, Delete

const users = ['Ivanildo', 'Peterson', 'Jose', 'Anderson', 'Karine']


server.use((req,res, next)=>{ //Middleware Global(É chamado antes de qualquer outra chamada)
    return next();
});

function checkUserExists(req, res, next){//Middleware Verifica se o usuario esta certo (Requisição Body) (POST, PUT)
    if(!req.body.name){
      return res.status(400).json({ error: 'User name is required' });
    }
    return next();
};

function checkUserInArray(req, res, next){// Middleware Verifica se existe o usuário
  const user = users[req.params.index];
  if(!user){
    return res.status(400).json({ error: 'User does not exists' });
  }
  req.user = user;
  return next();
}


server.get('/users/:index', checkUserInArray, checkUserInArray, (req, res)=>{
  const { index } = req.params;
  return res.json(req.user);
})

server.get('/users', (req, res)=>{
  return res.json(users);
});

server.post('/users',checkUserExists, (req, res)=>{
  const { name}  = req.body;
  users.push(name);
 
  return res.json(users)
 });

 server.put('/users/:index', checkUserInArray, checkUserExists, (req, res)=>{
   const { index } = req.params;
   const { name } = req.body;
   users[index] = name;
   return res.json(users);
 });

 server.delete('/users/:index',checkUserInArray, (req, res)=> {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json(users);
});


server.listen(3000);//Executando na porta 3000