export interface IGameRPG {
  fight(): number; // <- retorna o dano causado
  flee(): boolean; // <- retorna se conseguiu fugir ou não
  levelUp(): void;

  get level(): number;
}

export class Gamer {
  constructor(private gameRpg: IGameRPG) {}

  combat() {
    return this.gameRpg.fight();
  }

  escape() {
    return this.gameRpg.flee();
  }

  improve() {
    this.gameRpg.levelUp();
  }
}

export class LightSouls implements IGameRPG {
  private _level: number = 1;

  // 10 à 100 de dano
  fight() {
    console.log('Bate, rola, rola, bate, potion, bate');

    return Math.floor(Math.random() * (100 - 10 + 1)) + 10;
  }

  // 30% de chance de fugir
  flee() {
    console.log('Correeeeee');

    return Math.random() < 0.3;
  }

  levelUp() {
    console.log("Welcome Home, ashen one. Speak thine heart's desire.");

    this._level += 1;
  }

  get level() {
    return this._level;
  }
}

export class MoOnline implements IGameRPG {
  private _level: number = 1;

  // 1000 à 10000 de dano
  fight() {
    console.log('Bate, bate, bate, bate, bate, potion, bate, bate');

    return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
  }

  // 60% de chance de fugir
  flee() {
    console.log('Sair da missão');

    return Math.random() < 0.6;
  }

  levelUp() {
    console.log('+1 força');

    this._level += 1;
  }

  get level() {
    return this._level;
  }
}

const main = () => {
  const moOnline = new MoOnline();
  const lightSouls = new LightSouls();

  const moGamer = new Gamer(moOnline); // <- a classe Gamer recebe o jogo Mo Online
  const soulsGamer = new Gamer(lightSouls); // <- a classe Gamer recebe o jogo Light Souls

  moGamer.combat(); // Bate, bate, bate, bate, bate, potion, bate, bate
  soulsGamer.combat(); // Bate, rola, rola, bate, potion, bate
};

main();
