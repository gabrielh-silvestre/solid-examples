import {
  Gamer,
  IGameRPG,
  LightSouls,
  MoOnline,
} from '../../src/DependencyInversion';

describe('Tests for DependencyInversion example', () => {
  describe('[Unit] Tests', () => {
    let gameMock: IGameRPG;

    beforeEach(() => {
      gameMock = {
        level: 1,
        fight: jest.fn().mockReturnValue(10),
        flee: jest.fn().mockReturnValue(true),
        levelUp: jest.fn(),
      };
    });

    it.each([
      ['LightSouls', new LightSouls(), [10, 100]],
      ['MoOnline', new MoOnline(), [1000, 10000]],
    ])('[%s] should be able to fight', (_, game, dmgRange) => {
      // #### ARRANGE ####
      const sample = Array.from({ length: 20 });
      const [min, max] = dmgRange;

      // #### ACT ####
      const damages = sample.map(() => game.fight());

      // #### ASSERT ####
      expect(
        damages.every((damage) => damage >= min && damage <= max)
      ).toBeTruthy();
    });

    it.each([
      ['LightSouls', new LightSouls()],
      ['MoOnline', new MoOnline()],
    ])('[%s] should be able to flee', (_, game) => {
      // #### ARRANGE ####
      jest.spyOn(global.Math, 'random').mockReturnValue(0); // 100% de chance de fugir

      // #### ACT ####
      const flee = game.flee();

      // #### ASSERT ####
      expect(flee).toBeTruthy();
    });

    it.each([
      ['LightSouls', new LightSouls()],
      ['MoOnline', new MoOnline()],
    ])('[%s] should be able to level up', (_, game) => {
      // #### ARRANGE ####
      const startLevel = game.level;

      // #### ACT ####
      game.levelUp();

      // #### ASSERT ####
      expect(game.level).toBe(startLevel + 1);
    });

    it('[Gamer] should be able to combat', () => {
      // #### ARRANGE ####
      const gamer = new Gamer(gameMock);

      // #### ACT ####
      const combat = gamer.combat();

      // #### ASSERT ####
      expect(gameMock.fight).toHaveBeenCalled();
    });

    it('[Gamer] should be able to escape', () => {
      // #### ARRANGE ####
      const gamer = new Gamer(gameMock);

      // #### ACT ####
      const escape = gamer.escape();

      // #### ASSERT ####
      expect(gameMock.flee).toHaveBeenCalled();
    });

    it('[Gamer] should be able to improve', () => {
      // #### ARRANGE ####
      const gamer = new Gamer(gameMock);

      // #### ACT ####
      gamer.improve();

      // #### ASSERT ####
      expect(gameMock.levelUp).toHaveBeenCalled();
    });
  });

  describe('[Integration] Tests', () => {
    it.each([
      ['Light Souls', new LightSouls()],
      ['Mo Online', new MoOnline()],
    ])('[Gamer] should be able to combat in %s', (_, game) => {
      // #### ARRANGE ####
      const gamer = new Gamer(game);

      // #### ACT ####
      const combat = gamer.combat();

      // #### ASSERT ####
      expect(typeof combat).toBe('number');
    });

    it.each([
      ['Light Souls', new LightSouls()],
      ['Mo Online', new MoOnline()],
    ])('[Gamer] should be able to escape in %s', (_, game) => {
      // #### ARRANGE ####
      const gamer = new Gamer(game);

      // #### ACT ####
      const escape = gamer.escape();

      // #### ASSERT ####
      expect(typeof escape).toBe('boolean');
    });

    it.each([
      ['Light Souls', new LightSouls()],
      ['Mo Online', new MoOnline()],
    ])('[Gamer] should be able to improve in %s', (_, game) => {
      // #### ARRANGE ####
      const gamer = new Gamer(game);

      // #### ACT ####
      gamer.improve();

      // #### ASSERT ####
      expect(game.level).toBe(2);
    });
  });
});
