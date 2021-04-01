import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Block from "./Block";

class Blocks extends Component {
  state = { blocks: [], paginatedId: 1, blocksLength: 0 };

  componentDidMount() {
    fetch(`${document.location.origin}/api/blocks/length`)
      .then((response) => response.json())
      .then((json) => this.setState({ blocksLength: json }));

    this.fetchPaginatedBlocks(this.state.paginatedId)();
  }

  fetchPaginatedBlocks = (paginatedId) => () => {
    fetch(`${document.location.origin}/api/blocks/${paginatedId}`)
      .then((response) => response.json())
      .then((json) => this.setState({ blocks: json }));
  };

  render() {
    console.log("this.state", this.state);

    return (
      <div className="bg-white h-screen w-full flex-col justify-center">
        <div className="shadow w-screen py-2 z-10"><div className="justify-end flex my-2">
            <div className="mx-2">
                <Link className="bg-gray-100 rounded-full px-8 py-2 text-gray-700 no-underline hover:no-underline transition-colors duration-150 hover:bg-red-600" to="/">Home</Link>
            </div>
      		</div>
	</div>
        <h3 className="text-gray-600 my-2">Blocks</h3>
        <div className="rounded">
          {[...Array(Math.ceil(this.state.blocksLength / 5)).keys()].map(
            (key) => {
              const paginatedId = key + 1;

              return (
                <span
                  key={key}
                  onClick={this.fetchPaginatedBlocks(paginatedId)}
                >
                  <Button className="bg-gray-400 rounded-full px-4 py-2" bsSize="small" bsStyle="danger">
                    {paginatedId}
                  </Button>{" "}
                </span>
              );
            }
          )}
        </div>
	<div className="bg-white rounded w-3/5 justify-center justify-items-center mx-auto">
        {this.state.blocks.map((block) => {
          return <Block key={block.hash} block={block} />;
        })}
	</div>
      </div>
    );
  }
}

export default Blocks;



