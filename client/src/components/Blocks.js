// import FlatList from 'flatlist-react';
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Block from "./Block";

class Blocks extends Component {
  state = { blocks: [] };

  componentDidMount() {
    fetch(`${document.location.origin}/api/blocks`)
      .then((response) => response.json())
      .then((chain) => (this.props.entity.blockchain.chain = chain));
  }

  renderBlock(block) {
    return <Block key={block.hash} block={block} />;
  }
  render() {
    return (
      <div className="bg-white h-screen w-full flex-col justify-center">
        <div className="shadow w-screen py-2 z-10">
          <div className="justify-end flex my-2">
            <div className="mx-2">
              <Link
                className="bg-gray-100 rounded-full px-8 py-2 text-gray-700 no-underline hover:no-underline transition-colors duration-150 hover:bg-red-600 hover:text-white"
                to="/"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
        <h3 className="text-gray-600 my-2">Blocks</h3>
        <div className="bg-white rounded w-3/5 justify-center justify-items-center mx-auto">
          <FlatList
            list={this.props.entity.blockchain.chain}
            renderItem={this.renderBlock}
            renderWhenEmpty={() => <div>List is empty!</div>}
            sortBy={["timestamp", { key: "hash", descending: true }]}
            renderOnScroll
          />
        </div>
      </div>
    );
  }
}

export default Blocks;
