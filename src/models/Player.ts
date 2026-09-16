/*A palavra-chave "export" é utilizada para exportar a classe Player,
permitindo que ela seja importada e utilizadas em outros aquivos de projetos
Já a palavra-chave "class" é utilizada para definir uma classe em TypeScript.*/

export class Player {
    /*A palavra-chave "public" é usada para definir propriedades píblicas da classe
    permitindo que elas seja acessadas e modificadas de fora da classe.*/

    //atributos da classe Player
    public name: string;
    public health: number;
    public level: number;
    private readonly maxHealth = 100;


    //CONSTRUTOR CLASSE PLAYER

    /*O construtor é um método especial que é chamado quando uma nova instância da classe é criada.
    */

    constructor (name: string, health: number = 100, level: number = 1) {
    /*A palavra chave this é usada para referenciar a instância da classe atual
    pegue o heath por exemplo e de a ele o valor de 100 */

        this.name = name; //inicia o nome
        this.health = Math.min(Math.max(0, health), this.maxHealth); //inicia a vida
        this.level = level; //inicia o level
    }

    //METODOS DA CLASSE PLAYER
    /* Metodos sao funcoes que pertencem a uma classe e podem ser chamadas em instancias*/ 

    public attack(): string{
        //calcula o dano com base no nivel do player
        const damage = this.level * 10;
        /* A palavra-chave "return" é usada para retornar um valor de uma função ou metodo.*/
        return `O player ${this.name} atacou e causou ${damage} de dano!`;
    }

    /* O metodo takeDamage é usado para reduzir a vida do player que recebeu o dano */
    public takeDamage(damage: number): string{
        const amount = Math.max(0, Number(damage) || 0);
        this.health = Math.max(0, this.health - amount);

        if (this.health === 0) {
            return `O player ${this.name} foi derrotado!`;
        }

        return `O player ${this.name} levou ${amount} de dano! E agora tem ${this.health} de vida restante.`;
    }
    public heal(heal: number): string {
    const amount = Math.max(0, Number(heal) || 0);
    this.health = Math.min(this.maxHealth, this.health + amount);

    if (amount === 0) {
        return `O player ${this.name} tentou se curar, mas a cura foi inválida. Vida atual: ${this.health}.`;
    }

    return `O player ${this.name} foi curado! E agora tem ${this.health} de vida restante.`;
}
}
