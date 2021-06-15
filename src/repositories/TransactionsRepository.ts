/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const inc = this.transactions.reduce((Total, elemento) => {
      if (elemento.type === 'income') {
        return (Total += elemento.value);
      }
      return Total;
    }, 0);

    const out = this.transactions.reduce((Total, elemento) => {
      if (elemento.type === 'outcome') {
        return (Total += elemento.value);
      }
      return Total;
    }, 0);

    const b = inc - out;

    const balance = new Balance({
      total: b,
      income: inc,
      outcome: out,
    });

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
