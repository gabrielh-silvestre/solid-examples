import {
  ICurrency,
  convertValue,
  getBalance,
  isEnough,
  payBill,
} from '../../src/SingleResponsability';

describe('Tests for SingleResponsability example', () => {
  describe('[Unit] Tests', () => {
    it.each([
      // #### ARRANGE ####
      [10, 'USD', 46], // EXCHANGE.USD = 4.6 * 10 = 46
      [10, 'EUR', 50], // EXCHANGE.EUR = 5 * 10 = 50
      [10, 'CAD', 37], // EXCHANGE.CAD = 3.7 * 10 = 37
    ])(
      '[convertValue] should be able to convert %i %s to %i',
      (value, currency, expected) => {
        // #### ACT ####
        const convertedValue = convertValue(value, currency as ICurrency);

        // #### ASSERT ####
        expect(convertedValue).toBe(expected);
      }
    );

    it(// 20 random tests
    '[getBalance] should be able to get random balances between 100 and 1000', async () => {
      // #### ARRANGE ####
      const sample = Array.from({ length: 20 });
      const results = Promise.all(sample.map(() => getBalance())); // Sem problemas "esperar", pois a execução é rápida e em memória

      // #### ACT ####
      const balances = await results;

      // #### ASSERT ####
      expect(
        balances.every((balance) => balance >= 100 && balance <= 1000)
      ).toBe(true);
    });

    it('[isEnough] should be able to check if %i is enough for %i', () => {
      // #### ARRANGE ####
      const sample = Array.from({ length: 20 }, () => {
        const balance = Math.floor(Math.random() * 1000);
        const amount = 100;

        return [balance, amount];
      });
      const expected = sample.map(([balance, amount]) => balance >= amount);

      // #### ACT ####
      const results = sample.map(([balance, amount]) =>
        isEnough(balance, amount)
      );

      // #### ASSERT ####
      expect(results).toEqual(expected);
    });
  });

  describe('[Integration] Tests', () => {
    it.each([
      // #### ARRANGE ####
      // // O balanço da conta é sempre entre 10 e 1000
      ['conta paga', 10, 'USD'],
      ['saldo insuficiente', 1000, 'USD'],
      ['conta paga', 10, 'EUR'],
      ['saldo insuficiente', 1000, 'EUR'],
      ['conta paga', 10, 'CAD'],
      ['saldo insuficiente', 1000, 'CAD'],
    ])(
      '[payBill] should notify: "%s" on %i %s purchase',
      async (expected, amount, currency) => {
        // #### ACT ####
        const result = (
          await payBill(amount, currency as ICurrency)
        ).toLocaleLowerCase();

        // #### ASSERT ####
        expect(result).toContain(expected);
        expect(result).toContain('saldo anterior');
        expect(result).toContain('saldo atual');
      }
    );
  });
});
