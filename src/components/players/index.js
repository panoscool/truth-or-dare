import React, { Component } from "react";
import InputForm from "./input-form";
import PlayersList from "./players-list";

class Players extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      players: JSON.parse(sessionStorage.getItem("players")) || []
    };
  }

  handlePlay = () => this.props.onPlay();

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
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
        <div className="form-group">
          <InputForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            value={this.state.name}
            length={this.state.players.length + 1}
          />
          {this.renderPlayers()}
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
    );
  }
}

export default Players;
