const redis = require("redis");
const { parse } = require("uuid");
const { app } = require ("../config");
const Transaction = require("../wallet/transaction");
const Wallet= require("../wallet");

const CHANNELS = {
  TEST: "TEST",
  BLOCKCHAIN: "BLOCKCHAIN",
  TRANSACTION: "TRANSACTION",
};

class TransactionMiner{
  constructor({ blockchain, transactionPool, wallet, redisUrl }) {
    // make them publicly data members
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    
    this.publisher = redis.createClient(redisUrl);
    this.subscriber = redis.createClient(redisUrl);
    this.subscribeToChannels();
    this.subscriber.on("message", (channel, message) =>
      this.handleMessage(channel, message)
    );
  }
set blockchain(chain){
	this.blockchain.chain = chain
}
handleMessage(channel, message) {
    console.log(`Message received. Channel: ${channel}. Message: ${message}.`);

    const parsedMessage = JSON.parse(message);

    switch (channel) {
      case CHANNELS.BLOCKCHAIN:
        this.blockchain.replaceChain(parsedMessage, true, () => {
          this.transactionPool.clearBlockchainTransactions({
            chain: parsedMessage,
          });
          
        app.emit('blockchain', parsedMessage);  // extra line 
        });
        break;
      case CHANNELS.TRANSACTION:
        this.transactionPool.setTransaction(parsedMessage);
        app.emit('transaction-pool', parsedMessage);  // extra line 
        break;
      default:
        return;
    }
  }
  subscribeToChannels() {
    Object.values(CHANNELS).forEach((channel) => {
      this.subscriber.subscribe(channel);
    });
  }

  publish({ channel, message }) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  static broadcastChain(chain) {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(chain),
    });
  }
  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction),
    });
  }
}
  mineTransactions() {
      try{
    const validTransactions = this.transactionPool.validTransactions();

    validTransactions.push(
      Transaction.rewardTransaction({ minerWallet: this.wallet })
    );

    this.blockchain.addBlock({ data: validTransactions });
    this.broadcastChain();
    this.transactionPool.clear();
    
    return true;
      } catch(error) {return false;}
  }

 shareTransactionPool(){
// needs implementation
}
createAndShareTransaction(recipient, amount){
// more implementation, return some sort of success or failure with true or false
const transaction = this.wallet.createTransaction({recipient, amount, this.blockchain.chain });
if(transaction){
	this.broadcastTransaction(transaction);
	return transaction;
} 
else return false;
}
}

module.exports = TransactionMiner;
