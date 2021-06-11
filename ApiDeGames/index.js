const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTSecret = "kdskskddksdksdksskdsdksdkskdskdsdkskdpsks";
//autorizar acesso acesso externo de api
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// middleware
function auth(req, res, next) {
  const authToken = req.headers['authorization'];


  if(authToken != undefined){
    const bearer = authToken.split(' '); // separando meu token
    var token = bearer[1];

    jwt.verify(token, JWTSecret, (err, data) => {
      if(err){
          res.status(401);
          res.json({err: "Token Inválido"});
      }else{
        req.token = token;
        req.loggedUser = {id: data.id, email: data.email};
        next();
        console.log(data); //retorna informaçao de requisição

      }

    });

  }else{
    res.status(401);
    res.json({err: "Token Inválido!"});
  }
}


var DB ={
    games:[
      {
        id: 23,
        title: "call of duty MW",
        year: 2019,
        price: 60
      },
      {
        id: 50,
        title: "Gta",
        year: 2019,
        price: 40
      },
      {
        id: 10,
        title: "Sea of thieves",
        year: 2005,
        price: 29
      }
    ],

    users:[
      {
        id:1,
        name: "Rafael",
        email: "rafael@gmail.com",
        password: "123456"

      },
      {
        id:2,
        name: "Victor",
        email: "victor@gmail.com",
        password: "123456"
      }
    ]
}


app.get("/games", auth,(req, res) => {
  var HATEOAS = [
    {
      href: "http://localhost:3000/game/0",
      method: "DELETE",
      rel: "delete_game",
    },
    {
      href: "http://localhost:3000/game/0",
      method: "GET",
      rel: "get_game",

    },

    {
      href: "http://localhost:3000/auth/0",
      method: "POST",
      rel: "login",

    }
  ]


  res.statusCode = 200;
  res.json({games:DB.games, _links: HATEOAS});
});



/*GAMES ID*/
app.get("/game/:id",auth,(req, res) => {

  if(isNaN(req.params.id)){
      res.sendStatus(400);
  }else{
      
      var id = parseInt(req.params.id);

      var HATEOAS = [
        {
          href: "http://localhost:3000/game/"+id,
          method: "DELETE",
          rel: "delete_game"
        },
        {
          href: "http://localhost:3000/game/"+id,
          method: "PUT",
          rel: "edit_game"
    
        },
        {
          href: "http://localhost:3000/game/"+id,
          method: "GET",
          rel: "get_game"
    
        },
    
        {
          href: "http://localhost:3000/games/",
          method: "GET",
          rel: "get_all_games",
    
        }
      ]

      var game = DB.games.find(g => g.id == id);

      if(game != undefined){
          res.statusCode = 200;
          res.json({game,_links: HATEOAS});
      }else{
          res.sendStatus(404);
      }
  }
});
/*CRIAR GAME*/
app.post("/game",auth,(req, res) => { 
  var {title, price, year} = req.body;
  DB.games.push({
      id: 2323,
      title,
      price,
      year
  });
  res.sendStatus(200);
})

app.delete("/game/:id",auth,(req, res) => {
  if(isNaN(req.params.id)){
      res.sendStatus(400);
  }else{
      var id = parseInt(req.params.id);
      var index = DB.games.findIndex(g => g.id == id);

      if(index == -1){
          res.sendStatus(404);
      }else{
          DB.games.splice(index,1);
          res.sendStatus(200);
      }
  }
});

app.put("/game/:id",auth,(req, res) => {

  if(isNaN(req.params.id)){
      res.sendStatus(400);
  }else{
      
      var id = parseInt(req.params.id);

      var game = DB.games.find(g => g.id == id);

      if(game != undefined){

          var {title, price, year} = req.body;

          
          if(title != undefined){
              game.title = title;
          }

          if(price != undefined){
              game.price = price;
          }

          if(year != undefined){
              game.year = year;
          }
          
          res.sendStatus(200);

      }else{
          res.sendStatus(404);
      }
  }

});
app.get('/users', (req, res) =>{
  res.statusCode = 200;
  res.json(DB.users);
  
});

app.post("/auth",(req, res) => {

  var {email, password} = req.body;

  if(email != undefined){

      var user = DB.users.find(u => u.email == email);
      if(user != undefined){
          if(user.password == password){
              jwt.sign({id: user.id, email: user.email},JWTSecret,{expiresIn:'48h'},(err, token) => {
                  if(err){
                      res.status(400);
                      res.json({err:"Falha interna"});
                  }else{
                      res.status(200);
                      res.json({token: token});
                  }
              })
          }else{
              res.status(401);
              res.json({err: "Credenciais inválidas!"});
          }
      }else{
          res.status(404);
          res.json({err: "O E-mail enviado não existe na base de dados!"});
      }

  }else{
      res.status(400);
      res.send({err: "O E-mail enviado é inválido"});
  }
});

// servidor
const port = 3000;
app.listen(port, ()=>{
  console.log(`Escutando na porta ${port}`);
  console.log(`CTRL + Clique em http://localhost:${port}`);
});