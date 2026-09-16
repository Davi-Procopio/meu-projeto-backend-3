/*
A palavra-chave "export" é usada para exportar Classe Player, 
permitindo que ela seja importada e utilizadaem outros arquivos do proejto.
A palavra-cahve "Class" é usada para definir uma classe em TypeScript.
*/

export class Player {
    // A palvra-chave "public" é usada para definir prorpiedades
    // pública da classe, que podem ser acessados de fora da Classe.
    public name: string; // nome do player (string)
    public health: number; // saúde do player (number)
    public level: number; // nível do player (number)
    /*CONSTRUTOR DA CLASSE PLAYER
    O construrtor é um método especial que é chamado quando uma nova instância da classe é criada.*/
    constructor (name: string, health: number = 100, level: number = 1) {
        /* A palavra-chave "this" é usada para se referir à instância da classe.
        Ou seja, "Pegue o atributo 'health' da classe PLayer e atribua o valor de 'health' = 100 a ele."*/
        this.name = name;
        this.health = health;
        this.level = level;
    }

    // MÉTODOS DA CLASSE PLAYER
    /*Métodos são funções que pertencem a uma mesma calsse e podem ser
    chamadas em instâncias dessa classe.
    O método "attack" é usado para atacar  outro player. reduzind sua saúde.*/
    public attack(): string {
        // Calcula o dano com base no nível do player.
        const damage = this.level * 10
        // A palavra-chave "return" é usada para retornar um valor de uma função ou método.
        return `${this.name} atacou e causou ${damage} de dano!`
        }
    // O método "takeDamage" é usado para receber dano de outro player, reduzindo sua saúde.
    public takeDamage(damage: number): string {
        // Reduz a saúde do player com base no dano recebido.
        this.health -= damage;
        // Verifica se a saúde do player caiu para 0 ou menos.
        if (this.health <= 0) {
            this.health = 0;
        }
        return `${this.name} recebeu ${damage}
        de danoe agora tem ${this.health} de saúde!`
    }
}