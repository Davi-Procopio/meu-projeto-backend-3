// Importa a biblioteca Express e também o tipo Express
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express, Request, Response } from "express";

///// IMPORTAR A CLASSE PLAYER DO ARQUIVO Player.ts
///// No final da importação é necessario colocar o .js, porque quando o typeScript é compilado para JavaScript 
import { Player } from "./models/Player.js";

// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicação
const app: Express = express();

/* MiddleWare para que o servidor aceite requisições JSON */
app.use(express.json());

// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;

const player = new Player("Patrick Jane")
    

/////ROTA GET PARA OBTER INFORMÇÕES DO PLAYER
/////Quando um usuario acessar a rota "/player" via GET,o servidor ira retornar suas informações em formato JSON
app.get("/player", (req: Request, res: Response) =>{
    res.json({
        message: "informações do player",
        player : player,
    })
});

/////ROTA POST PARA ATACAR O PLAYER
/////Quando um usuario acessar a rota "/player/attack" via POST, o servidor ira atacar o player e retornar uma mensagem com o dano causado
app.post("/player/attack", (req: Request, res: Response) =>{
    const attackMessage = player.attack();
    res.json({
        message: attackMessage,
    })
});

/////ROTA POST PARA RECEBER DANO NO PLAYER
/////Quando um usuario acessar a rota "/player/takeDamage" via POST, o servidor ira receber o dano e retornar uma mensagem com a vida restante do player
app.post("/player/takeDamage", (req: Request, res: Response) =>{
    const damageValue = Number(req.body?.damage);

    if (!Number.isFinite(damageValue) || damageValue < 0) {
        return res.status(400).json({
            message: "Valor de dano inválido. Envie um número maior ou igual a 0.",
        });
    }

    const damageMessage = player.takeDamage(damageValue);

    return res.json({
        action : damageMessage,
        currentHealth: player.health,
        currentLevel: player.level,
    })
});

app.post("/player/heal", (req: Request, res: Response) => {
    const healValue = Number(req.body?.heal);

    if (!Number.isFinite(healValue) || healValue < 0) {
        return res.status(400).json({
            message: "Valor de cura inválido. Envie um número maior ou igual a 0.",
        });
    }

    const healMessage = player.heal(healValue);

    return res.json({
        action: healMessage,
        currentHealth: player.health,
        currentLevel: player.level,
    });
});


// Inicializa o servidor utilizando a porta definida
// O método listen() faz o servidor começar a "escutar" requisições HTTP
app.listen(PORT, () => {
console.log(`Servidor rodando em http://localhost:${PORT}`);
console.log("Rotas disponíveis:");
console.log(`GET http://localhost:${PORT}/player - obter informações do player`);
console.log(`POST http://localhost:${PORT}/player/attack - atacar o player`);
console.log(`POST http://localhost:${PORT}/player/takeDamage - causar dano ao player`);
console.log(`POST http://localhost:${PORT}/player/heal - curar o player`);
});