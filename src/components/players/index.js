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
      players: JSON.parse(sessionStorage.getItem("players")) || []
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
    let newPlayer = this.state.players;
    newPlayer.push(this.state.name);
    this.setState(
      {
        name: "",
        players: newPlayer
      },
      this.refreshStorage
    );
  };

  deletePlayer = index => {
    let newPlayer = this.state.players;
    newPlayer.splice(index, 1);
    this.setState({ players: newPlayer }, this.refreshStorage);
  };

  refreshStorage = () => {
    sessionStorage.setItem("players", JSON.stringify(this.state.players));
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
              length={this.state.players.length + 1}
            />
            <div className="text-center">
              {this.state.players.length ? (
                <div>{this.renderPlayers()}</div>
              ) : (
                <h3>Add your names to start the game!</h3>
              )}
            </div>
            <Categories />
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
