import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "../dist/style.css";
import "../index.css";
class App extends Component {
  state = { walletInfo: {} };

  componentDidMount() {
     this.setState({ walletInfo: {
    address: wallet.publicKey,
    balance: Wallet.calculateBalance({ chain: account.blockchain.chain, wallet.publicKey }),
  } });
  }

  render() {
    const address_short = this.state.walletInfo.address;
    const balance = this.state.walletInfo.balance;
    return (
      <div className="bg-white h-screen w-full flex-col justify-center">
      <div className="shadow w-screen py-2 z-10"><div className="justify-end flex my-2">
            <div className="mx-2">
                <Link className="bg-gray-100 rounded-full px-8 py-2 text-gray-700 no-underline hover:no-underline transition-colors duration-150 hover:bg-red-600 hover:text-white" to="/blocks">Blocks</Link>
            </div>
            <div className="mx-2">
                <Link className="bg-gray-100 rounded-full px-8 py-2 text-gray-700 no-underline hover:no-underline transition-colors duration-150 hover:bg-red-600 hover:text-white" to="/conduct-transaction">Transact</Link>
            </div>
            <div className="mx-2">
                <Link className="bg-gray-100 rounded-full px-8 py-2 text-gray-700 no-underline hover:no-underline transition-colors duration-150 hover:bg-red-600 hover:text-white" to="/transaction-pool">Pool</Link>
            </div>
            <div className="ml-8 mr-2 justify-center text-gray-600 flex">
                <div data-clipboard-text={`${address_short}`} className="copy_text select-none cursor-pointer transition duration-100 hover:shadow bg-white active:bg-red-600 active:text-white rounded-full overflow-hidden w-32 h-8 px-2 mr-2 px-2">{`@${address_short}`}</div>{" | "}<div className="select-none transition duration-100 hover:shadow rounded-full px-2 ml-2 w-32 px-2">{`B: ${balance}`}</div>
            </div>
      </div></div>
            <div className="text-gray-600">Welcome to the blockchain...</div>
            
      </div>
    );
  }
}

export default App;
