import React, { Component } from "react";
import Players from "./components/players";
import Game from "./components/game";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questCategory: "",
      gameOn: false
    };
  }

  startGame = () => this.setState({ gameOn: true });

  stopGame = () => this.setState({ gameOn: false });

  handleCategory = evt => {
    const questCategory = evt.target.value;
    this.setState({ questCategory });
  };

  render() {
    const { gameOn } = this.state;
    const players = sessionStorage.getItem("players");
    if (players && gameOn) {
      return (
        <Game onHome={this.stopGame} questCategory={this.state.questCategory} />
      );
    }
    return (
      <Players handleCategory={this.handleCategory} onPlay={this.startGame} />
    );
  }
}

export default App;
