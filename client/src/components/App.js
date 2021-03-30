import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "../dist/style.css";
import "../index.css";
class App extends Component {
  state = { walletInfo: {} };

  componentDidMount() {
    fetch(`${document.location.origin}/api/wallet-info`)
      .then((response) => response.json())
      .then((json) => this.setState({ walletInfo: json }));
  }

  render() {
    const address_short = this.state.walletInfo.address;
    const balance = this.state.walletInfo.balance;
    return (
      <div className="bg-white h-screen w-full flex-col justify-center">
      <div className="shadow w-screen py-2 z-10"><div className="justify-end flex my-2">
            <div className="mx-2">
                <Link className="bg-gray-100 rounded-full px-8 py-2 text-gray-700 no-underline hover:no-underline" to="/blocks">Blocks</Link>
            </div>
            <div className="mx-2">
                <Link className="bg-gray-100 rounded-full px-8 py-2 text-gray-700 no-underline hover:no-underline" to="/conduct-transaction">Transact</Link>
            </div>
            <div className="mx-2">
                <Link className="bg-gray-100 rounded-full px-8 py-2 text-gray-700 no-underline hover:no-underline" to="/transaction-pool">Pool</Link>
            </div>
            <div className="ml-8 mr-2 justify-center text-gray-600 flex">
                <div className="transition duration-100 hover:shadow rounded-full overflow-hidden w-32 h-8 px-2 mr-2 px-2">{`@${address_short}`}</div>{" | "}<div className="transition duration-100 hover:shadow rounded-full px-2 ml-2 w-32 px-2">{`B: ${balance}`}</div>
            </div>
      </div></div>
            <div className="text-gray-600">Welcome to the blockchain...</div>
            
      </div>
    );
  }
}

export default App;
