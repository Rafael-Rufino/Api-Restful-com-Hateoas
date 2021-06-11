# API de Games

Esta API é Utilizar 
## Endpoints
### GET /games

Esse ennpoint é responsável por retornar a listagem de todos os games cadastradados no banco de dados.
### Parametros
Nenhum
#### Respostas
###### Ok 200
Caso essa resposta aconteça você vai  receber  a listagem de todos os games
### Exemplo de resposta:
```
[
    {
        "id": 23,
        "title": "call of duty MW",
        "year": 2019,
        "price": 60
    },
    {
        "id": 50,
        "title": "Gta",
        "year": 2019,
        "price": 40
    },
    {
        "id": 10,
        "title": "Sea of thieves",
        "year": 2005,
        "price": 29
    }
]
```
###### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de auteticação de requisição. Motivos: Token inválido, Token expirado.

### Exemplo da resposta:

```
{
    "err": "Token Inválido"
}
```

## Endpoints
### POST /auth

Esse ennpoint é responsável por  fazer o processo de login.

### Parametros
email: E-mail do usuário cadastrado no sistema.

password: senha do usuário cadastrado no sistema, com aquele determinado e-mail.

### Exemplo:
```
{
    "email": "rafael@gmail.com",
    "password": "123456"

}

```
#### Respostas
###### Ok 200
Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar Endpoints protegidos na API.
### Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYWZhZWxAZ21haWwuY29tIiwiaWF0IjoxNjIyOTE3ODE1LCJleHAiOjE2MjMwOTA2MTV9.4UCsYClT6iUC6lhvKyp4UsTcgrWYPhVvjneSRsmheHA"
}
```
###### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de auteticação de requisição. Motivos: Senha ou e-mail incorreta.


### Exemplo da resposta:

```
{
    "err": "Credenciais inválidas!"
}
```

###### Falha na autenticação! 404
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de auteticação de requisição. Motivos: Senha ou e-mail não cadastrada no banco de dados.

### Exemplo da resposta: 

```
[
  {
      "err": "O E-mail enviado não existe na base de dados!"
  }
]

```
