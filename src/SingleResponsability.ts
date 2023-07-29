export const EXCHANGE = {
  USD: 4.6,
  EUR: 5,
  CAD: 3.7,
};

export type ICurrency = keyof typeof EXCHANGE;

export const convertValue = (value: number, currency: ICurrency) => {
  return Math.floor(value * EXCHANGE[currency]);
};

export const getBalance = async () => {
  /* const query = `
    SELECT amount FROM user.wallet;
  `;

  export const [{ amount }] = await mysql.execute(query);

  return amount; */

  return Math.floor(Math.random() * 900) + 100;
};

export const isEnough = (personalBalance: number, totalAmount: number) => {
  return personalBalance > totalAmount;
};

export const payBill = async (billValue: number, billCurrency: ICurrency) => {
  const myBalance = await getBalance();
  const convertedValue = convertValue(billValue, billCurrency);

  if (isEnough(myBalance, convertedValue)) {
    return `Conta paga | saldo anterior ${myBalance} | saldo atual ${
      myBalance - convertedValue
    }`;
  }

  return `Saldo insuficiente | saldo anterior ${myBalance} | saldo atual ${myBalance}`;
};
