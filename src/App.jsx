import React, { Component } from 'react';
import Players from './components/Players/PlayersPage';
import Game from './components/Game/GamePage';

class App extends Component {
  state = {
    category: localStorage.getItem('category') || '',
    gameOn: false
  };

  startGame = () => this.setState({ gameOn: true });

  stopGame = () => this.setState({ gameOn: false });

  handleCategory = (event) => {
    localStorage.setItem('category', event.target.value);
    this.setState({ category: event.target.value });
  };

  render() {
    const { gameOn, category } = this.state;
    const players = localStorage.getItem('players');

    if (players && gameOn) {
      return <Game onHome={this.stopGame} category={category} />;
    }
    return (
      <Players
        handleCategory={this.handleCategory}
        onPlay={this.startGame}
        category={category}
      />
    );
  }
}

export default App;
