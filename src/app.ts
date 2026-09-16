// Importa a biblioteca Express e também o tipo Express
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express, Request, Response } from "express";

// importar a classe Player do arquivo Player.ts
/* O arquivo deve ser importado como "Player.js" e não "PLayer.ts "pois,
durante o processo de compilagem, os arquivos são transformados
em JavaScript e não em TypeScript*/
import { Player } from "./models/Player.js"

// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicação
const app: Express = express();

// Middleware para permitir que o servidor aceite requisições com corpo e formato JSON.
app.use(express.json());

// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;

// Cria um novo player com nome "Jogador1", 100 de vida e nível 1.
const player1: Player = new Player("PatrickJane", 100, 1);

// Rota GET para obter informações sobre um player.
/*Quando um usuário acessar a rota "/plaeyr" via GET,
o servidor irá retornar suas informações em formato JSON*/
app.get("/player", (req: Request, res: Response) => {
  res.json({
    message: "Informações do Player",
    player: player1,
  });
});

//ROTA POST PARA ATACAR O PLAYER
//Quando um usuario acessar a rota "/player/attack" via POST, o servidor ira atacar o player e retornar uma mensagem com o dano causado
app.post("/player/attack", (req: Request, res: Response) =>{
    //chama o metodo attack da classe Player e armazena a mensagem de ataque na variavel attackMessage
    const attackMessage = player1.attack();
    res.json({
        message: attackMessage,
        player: player1,
    })
});

//ROTA POST PARA RECEBER DANO NO PLAYER
//Quando um usuario acessar a rota "/player/takeDamage" via POST, o servidor ira receber o dano e retornar uma mensagem com a vida restante do player
app.post("/player/takeDamage", (req: Request, res: Response) =>{
    //extrai o valor do dano do corpo da requisição
    const { damage } = req.body;
    //chama o metodo takeDamage da classe Player e armazena a mensagem de dano na variavel damageMessage
    const damageMessage = player1.takeDamage(damage);
    res.json({
        action : damageMessage,
        currentHealth: player1.health,
        currentLevel: player1.level,
    })
});

// Inicializa o servidor utilizando a porta definida
// O método listen() faz o servidor começar a "escutar" requisições HTTP
app.listen(PORT, () => {
console.log(`Servidor rodando em http://localhost:${PORT}`);
console.log("Rotas disponíveis: ");
console.log('GET http://localhost:${PORT}/player - obter informações dos players')
console.log('POST http://localhost:${PORT}/player/attack - atacar o player')
console.log('POST http://localhost:${PORT}/player/takeDamage - causar dano ao player')
});
