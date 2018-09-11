import React, { Component } from "react";
import { Link } from "react-router-dom";
import { truth, dare } from "../questions";
import CountdownTimer from "../timer";
import ShowQuest from "./show-quest";

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
    // let remTQuest = truth.filter(t => !t.hasGameeard)
    let randomNum = Math.floor(Math.random() * truth.length);
    this.setState({
      currentQuest: truth[randomNum],
      currentType: "Truth"
    });
    truth.splice(randomNum, 1);
    // truth[randomNum].hasAppeard = true
  };

  handleRandomDare = () => {
    this.playerTurn();
    // let remDQuest = dare.filter(d => !d.hasAppeard)
    let randomNum = Math.floor(Math.random() * dare.length);
    this.setState({
      currentQuest: dare[randomNum],
      currentType: "Dare"
    });
    dare.splice(randomNum, 1);
    // dare[randomNum].hasAppeard = true
  };

  playerTurn = () => {
    let index = this.state.currentPlayer;
    index = index + 1;

    if (this.players[index]) {
      this.setState({ currentPlayer: index });
    } else {
      // next question
      this.setState({ currentPlayer: 0 });
      // TODO: go to next question
    }
  };

  render() {
    //  {truth.map((quest, index) => <h3 key={index}>{quest.question}</h3>)}
    //  {dare.map((quest, index) => <h3 key={index}>{quest.question}</h3>)}
    return (
      <div className="tod">
        <div className="logo">
          <img
            alt="logo"
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            height="70"
            width="120"
          />
        </div>
        <div className="timer">
          <CountdownTimer />
        </div>

        <div className="questions">
          <ShowQuest
            currentQuest={this.state.currentQuest}
            currentType={this.state.currentType}
            currentPlayer={this.players[this.state.currentPlayer]}
          />
        </div>

        <button className="btn btn-truth" onClick={this.handleRandomTruth}>
          Truth ({truth.length})
        </button>
        <button className="btn btn-dare" onClick={this.handleRandomDare}>
          Dare ({dare.length})
        </button>
        <Link className="btn btn-home" to="/">
          Home
        </Link>
      </div>
    );
  }
}

export default Game;
