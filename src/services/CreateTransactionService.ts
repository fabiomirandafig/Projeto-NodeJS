import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (type === 'income' || (type === 'outcome' && value <= balance.total)) {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });

      return transaction;
    }
    throw Error(
      'Você não possui valor total em caixa disponível para fazer uma retirada com esse valor.',
    );
  }
}

export default CreateTransactionService;
