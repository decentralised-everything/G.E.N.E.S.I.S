const Transaction = require("../wallet/transaction");
class Person {
  constructor({ blockchain, transactionPool, wallet}) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.knownAddresses=[];
  }

  mineTransactions() {
    const validTransactions = this.transactionPool.validTransactions();

    validTransactions.push(
      Transaction.rewardTransaction({ minerWallet: this.wallet })
    );

    const block = this.blockchain.addBlock({ data: validTransactions });
    this.transactionPool.clear();
    
    return block;
  }
}

module.exports = Person;
