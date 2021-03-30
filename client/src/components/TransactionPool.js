import Transaction from "./Transaction";
import { Button } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../history";

const POLL_INTERVAL_MS = 10000;

class TransactionPool extends Component {
  state = { transactionPoolMap: {} };

  fetchTransactionPoolMap = () => {
    fetch(`${document.location.origin}/api/transaction-pool-map`)
      .then((response) => response.json())
      .then((json) => this.setState({ transactionPoolMap: json }));
  };

  fetchMineTransactions = () => {
    fetch(`${document.location.origin}/api/mine-transactions`).then(
      (response) => {
        if (response.status === 200) {
          alert("success");
          history.push("/blocks");
        } else {
          alert("The mine-transactions block request did not complete.");
        }
      }
    );
  };

  componentDidMount() {
    this.fetchTransactionPoolMap();

    this.fetPoolMapInterval = setInterval(
      () => this.fetchTransactionPoolMap(),
      POLL_INTERVAL_MS
    );
  }

  componentWillUnmount() {
    clearInterval(this.fetPoolMapInterval);
  }

  render() {
    return (
      <div className="bg-white h-screen w-full flex-col justify-center">
        <div className="shadow w-screen py-2 z-10"><div className="justify-end flex my-2">
            <div className="mx-2">
                <Link className="bg-gray-100 rounded-full px-8 py-2 text-gray-700 no-underline hover:no-underline" to="/">Home</Link>
            </div>
      		</div>
	</div>
        <h3 className="text-gray-600 my-8">Transaction Pool</h3>
        {Object.values(this.state.transactionPoolMap).map((transaction) => {
          return (
            <div key={transaction.id}>
              <hr />
              <Transaction transaction={transaction} />
            </div>
          );
        })}
        <hr />
        <Button bsStyle="danger" className="bg-gray-100 rounded-full px-8 py-2 text-gray-700 no-underline hover:no-underline" onClick={this.fetchMineTransactions}>
          Mine the Transactions
        </Button>
      </div>
    );
  }
}

export default TransactionPool;
