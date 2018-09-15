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

  startGame = () => {
    this.setState({
      gameOn: true
    });
  };

  stopGame = () => this.setState({ gameOn: false });
  render() {
    const { gameOn } = this.state;
    const players = sessionStorage.getItem("players");
    if (players && gameOn) {
      return (
        <div className="App">
          <Game onHome={this.stopGame} />
        </div>
      );
    }
    return (
      <div className="App">
        <Players onPlay={this.startGame} />
      </div>
    );
  }
}

export default App;
