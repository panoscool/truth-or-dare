import React, { Component } from 'react';
import HomePage from './components/HomePage';
import GamePage from './components/Game/GamePage';

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
      return <GamePage onHome={this.stopGame} category={category} />;
    }
    return (
      <HomePage
        handleCategory={this.handleCategory}
        onPlay={this.startGame}
        category={category}
      />
    );
  }
}

export default App;
