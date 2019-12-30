import React, { Component } from 'react';
import { truth, dare } from '../questions';
import ShowQuest from './ShowQuest';
import Buttons from './Buttons';

class GamePage extends Component {
  state = {
    currentPlayer: -1,
    currentQuest: null,
    currentType: null
  };

  randomTruth = () => {
    this.playerTurn();

    const { category } = this.props;
    const getTruthCategory = truth.filter(t => t.category === category);

    const truthQuest = getTruthCategory.filter(t => !t.appeared);

    const randomNum = Math.floor(Math.random() * truthQuest.length);

    this.setState({
      currentQuest: truthQuest[randomNum],
      currentType: 'Truth'
    });
    truth[randomNum].appeared = true;
  };

  randomDare = () => {
    this.playerTurn();

    const { category } = this.props;
    const getDareCategory = dare.filter(d => d.category === category);

    const dareQuest = getDareCategory.filter(d => !d.appeared);

    const randomNum = Math.floor(Math.random() * dareQuest.length);

    this.setState({
      currentQuest: dareQuest[randomNum],
      currentType: 'Dare'
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
    this.players = JSON.parse(localStorage.getItem('players'));
    const { category } = this.props;
    const remainingTruths = truth
      .filter(t => t.category === category)
      .filter(t => !t.appeared);
    const remainingDares = dare
      .filter(d => d.category === category)
      .filter(d => !d.appeared);
    return (
      <div className="container">
        <div className="border border-info rounded">
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

export default GamePage;
