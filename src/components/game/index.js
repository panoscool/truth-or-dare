import React, { Component } from "react";
import { truth, dare } from "../questions";
import CountdownTimer from "../timer";
import ShowQuest from "./show-quest";
import logo from "../../logo.png";
import Buttons from "./buttons";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      currentPlayer: -1,
      currentQuest: null,
      currentType: null
    };

    this.players = JSON.parse(localStorage.getItem("players"));
  }

  randomTruth = () => {
    this.playerTurn();

    const { questCategory } = this.props;
    const getTruthCategory = truth.filter(t => t.category === questCategory);

    const truthQuest = getTruthCategory.filter(t => !t.appeared);

    const randomNum = Math.floor(Math.random() * truthQuest.length);

    this.setState({
      currentQuest: truthQuest[randomNum],
      currentType: "Truth"
    });
    truth[randomNum].appeared = true;
  };

  randomDare = () => {
    this.playerTurn();

    const { questCategory } = this.props;
    const getDareCategory = dare.filter(d => d.category === questCategory);

    const dareQuest = getDareCategory.filter(d => !d.appeared);

    const randomNum = Math.floor(Math.random() * dareQuest.length);

    this.setState({
      currentQuest: dareQuest[randomNum],
      currentType: "Dare"
    });
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
    const remainingTruths = truth
      .filter(t => t.category === questCategory)
      .filter(t => !t.appeared);
    const remainingDares = dare
      .filter(d => d.category === questCategory)
      .filter(d => !d.appeared);
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

          <ShowQuest
            currentQuest={this.state.currentQuest}
            currentType={this.state.currentType}
            currentPlayer={this.players[this.state.currentPlayer]}
          />

          <Buttons
            randomTruth={this.randomTruth}
            randomDare={this.randomDare}
            handleHome={this.handleHome}
            remainingTruths={remainingTruths}
            remainingDares={remainingDares}
          />
        </div>
      </div>
    );
  }
}

export default Game;
