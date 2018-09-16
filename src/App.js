import React, { Component } from "react";
import Players from "./components/players";
import Game from "./components/game";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOn: false
    };
  }

  startGame = () => this.setState({ gameOn: true });

  stopGame = () => this.setState({ gameOn: false });

  render() {
    const { gameOn } = this.state;
    const players = sessionStorage.getItem("players");
    if (players && gameOn) {
      return <Game onHome={this.stopGame} />;
    }
    return <Players onPlay={this.startGame} />;
  }
}

export default App;
