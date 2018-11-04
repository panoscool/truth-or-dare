import React, { Component } from "react";
import InputForm from "./input-form";
import PlayersList from "./players-list";
import Categories from "./categories";
import logo from "../../logo.png";

class Players extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      players: JSON.parse(localStorage.getItem("players")) || []
    };
  }

  handlePlay = () => this.props.onPlay();

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.addPlayer();
    }
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  addPlayer = e => {
    if (!this.state.name.trim()) {
      return;
    }
    const player = {
      name: this.state.name,
      score: 0
    };
    let newPlayers = this.state.players;
    newPlayers.push(player);
    this.setState(
      {
        name: "",
        players: newPlayers
      },
      this.refreshStorage
    );
  };

  deletePlayer = index => {
    let newPlayers = this.state.players;
    newPlayers.splice(index, 1);
    this.setState({ players: newPlayers }, this.refreshStorage);
  };

  refreshStorage = () => {
    localStorage.setItem("players", JSON.stringify(this.state.players));
  };

  renderPlayers = () => {
    return this.state.players.map((playerName, index) => {
      return (
        <PlayersList
          key={index}
          playerName={playerName}
          deletePlayer={this.deletePlayer}
        />
      );
    });
  };

  render() {
    return (
      <div className="container">
        <div className="border border-info rounded">
          <div className="logo text-center py-2">
            <img alt="logo" src={logo} height="70" width="120" />
          </div>
          <div className="m-3">
            <InputForm
              handleChange={this.handleChange}
              handleKeyUp={this.handleKeyUp}
              addPlayer={this.addPlayer}
              value={this.state.name}
            />
            <div className="text-center">
              {this.state.players.length ? (
                <div>{this.renderPlayers()}</div>
              ) : (
                <h3>Add at least 2 names to start the game!</h3>
              )}
            </div>
            <Categories handleCategory={this.props.handleCategory} />
            <button
              type="button"
              className="btn btn-info btn-lg btn-block"
              onClick={this.handlePlay}
              disabled={this.state.players.length <= 1}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Players;
