import React, { Component } from "react";
import { truth, dare } from "../questions";
import CountdownTimer from "../timer";
import ShowQuest from "./show-quest";
import logo from "../../logo.png";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      currentPlayer: -1,
      currentQuest: null,
      currentType: null
    };

    this.players = JSON.parse(sessionStorage.getItem("players"));
  }

  handleRandomTruth = () => {
    this.playerTurn();

    const { questCategory } = this.props;

    let remTQuest = truth
      .filter(t => t.category === questCategory)
      .filter(t => !t.appeared);
    let randomNum = Math.floor(Math.random() * remTQuest.length);

    this.setState({
      currentQuest: truth[randomNum],
      currentType: "Truth"
    });
    // truth.splice(randomNum, 1);
    truth[randomNum].appeared = true;
  };

  handleRandomDare = () => {
    this.playerTurn();

    const { questCategory } = this.props;

    let remDQuest = dare
      .filter(d => d.category === questCategory)
      .filter(d => !d.appeared);
    let randomNum = Math.floor(Math.random() * remDQuest.length);

    this.setState({
      currentQuest: dare[randomNum],
      currentType: "Dare"
    });
    // dare.splice(randomNum, 1);
    dare[randomNum].appeared = true;
  };

  playerTurn = () => {
    let index = this.state.currentPlayer;
    index = index + 1;

    if (this.players[index]) {
      this.setState({ currentPlayer: index });
    } else {
      this.setState({ currentPlayer: 0 });
    }
  };

  handleHome = () => this.props.onHome();

  render() {
    const { questCategory } = this.props;

    let remTQuest = truth
      .filter(t => t.category === questCategory)
      .filter(t => !t.appeared);

    let remDQuest = dare
      .filter(d => d.category === questCategory)
      .filter(d => !d.appeared);

    //  {truth.map((quest, index) => <h3 key={index}>{quest.question}</h3>)}
    //  {dare.map((quest, index) => <h3 key={index}>{quest.question}</h3>)}
    return (
      <div className="container">
        <div className="border border-info rounded">
          <div className="header">
            <img
              className="py-2"
              alt="logo"
              src={logo}
              height="70"
              width="120"
            />
            <CountdownTimer />
          </div>

          <div className="questions text-center">
            <ShowQuest
              currentQuest={this.state.currentQuest}
              currentType={this.state.currentType}
              currentPlayer={this.players[this.state.currentPlayer]}
            />
          </div>

          <div className="controls mb-1">
            <button
              className="btn btn-success btn-block m-0"
              onClick={this.handleRandomTruth}
            >
              Truth ({remTQuest.length})
            </button>

            <button
              className="btn btn-info btn-block m-0"
              onClick={this.handleHome}
            >
              Home
            </button>

            <button
              className="btn btn-danger btn-block m-0"
              onClick={this.handleRandomDare}
            >
              Dare ({remDQuest.length})
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
