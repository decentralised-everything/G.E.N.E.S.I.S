import React from "react";
import { render } from "react-dom";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import App from "./components/App";
import Blocks from "./components/Blocks";
import ConductTransaction from "./components/ConductTransaction";
import TransactionPool from "./components/TransactionPool";
import { Person } from "../../app/transaction-miner";
import "./dist/style.css";

const Miner_account = Person();
render(
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/blocks" component={Blocks} entity={Miner_account} />
      <Route
        path="/conduct-transaction"
        component={ConductTransaction}
        entity={Miner_account}
      />
      <Route
        path="/transaction-pool"
        component={TransactionPool}
        entity={Miner_account}
      />
    </Switch>
  </Router>,
  document.getElementById("root")
);
