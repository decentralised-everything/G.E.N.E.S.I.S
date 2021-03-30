import React, { Component } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import history from "../history";

class ConductTransaction extends Component {
  state = { recipient: "", amount: 0, knownAddresses: [] };

  componentDidMount() {
    fetch(`${document.location.origin}/api/known-addresses`)
      .then((response) => response.json())
      .then((json) => this.setState({ knownAddresses: json }));
  }

  updateRecipient = (event) => {
    this.setState({ recipient: event.target.value });
  };

  updateAmount = (event) => {
    this.setState({ amount: Number(event.target.value) });
  };

  conductTransaction = () => {
    const { recipient, amount } = this.state;

    fetch(`${document.location.origin}/api/transact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient, amount }),
    })
      .then((response) => response.json())
      .then((json) => {
        alert(json.message || json.type);
        history.push("/transaction-pool");
      });
  };

  render() {
    return (
       <div className="bg-white h-screen w-full flex-col justify-center">
        <div className="shadow w-screen py-2 z-10"><div className="justify-end flex my-2">
            <div className="mx-2">
                <Link className="bg-gray-100 rounded-full px-8 py-2 text-gray-700 no-underline hover:no-underline" to="/">Home</Link>
            </div>
      		</div>
	</div>
        <h3 className="text-gray-600 my-8">Conduct a Transaction</h3>
        <br />
        <h4 className="text-gray-600">Known Addresses</h4>
	<div className="flex justify-items-center justify-center w-3/5">
        {this.state.knownAddresses.map((knownAddress) => {
          return (
            <div className="text-gray-600" key={knownAddress}>
              <div className="transition duration-100 hover:shadow rounded-full overflow-hidden w-32 h-8 px-2 mr-2 px-2">{`@${knownAddress}`}</div>
              <br />
            </div>
          );
        })}
	</div>
        <br />
        <FormGroup className="my-8">
          <FormControl
	    className="rounded-full px-6 py-2 bg-gray-200 text-gray-600"
            input="text"
            placeholder="@geniusss"
            value={this.state.recipient}
            onChange={this.updateRecipient}
          />
        </FormGroup>
        <FormGroup className="my-8">
          <FormControl
	    className="rounded-full px-6 py-2 bg-gray-200 text-gray-600"
            input="number"
            placeholder="amount"
            value={this.state.amount}
            onChange={this.updateAmount}
          />
        </FormGroup>
        <div>
          <Button bsStyle="danger" className="bg-gray-100 rounded-full px-8 py-2 text-gray-700 no-underline hover:no-underline" onClick={this.conductTransaction}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default ConductTransaction;
