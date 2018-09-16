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

  handleHome = () => this.props.onHome();

  render() {
    //  {truth.map((quest, index) => <h3 key={index}>{quest.question}</h3>)}
    //  {dare.map((quest, index) => <h3 key={index}>{quest.question}</h3>)}
    return (
      <div className="container border border-info rounded">
        <div className="header row">
          <div className="logo col mt-1">
            <img alt="logo" src={logo} height="70" width="120" />
          </div>

          <div className="timer col-8">
            <CountdownTimer />
          </div>
        </div>

        <div className="questions">
          <ShowQuest
            currentQuest={this.state.currentQuest}
            currentType={this.state.currentType}
            currentPlayer={this.players[this.state.currentPlayer]}
          />
        </div>

        <div className="controls">
          <button
            className="btn btn-success btn-lg mr-5"
            onClick={this.handleRandomTruth}
          >
            Truth ({truth.length})
          </button>
          <button
            className="btn btn-info btn-lg mx-5"
            onClick={this.handleHome}
          >
            Home
          </button>
          <button
            className="btn btn-danger btn-lg ml-5"
            onClick={this.handleRandomDare}
          >
            Dare ({dare.length})
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
