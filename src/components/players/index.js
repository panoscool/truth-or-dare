import React, { Component } from "react";
import PlayersList from "./players-list";
import InputForm from "./input-form";
import { Link } from "react-router-dom";

class Players extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      players: JSON.parse(sessionStorage.getItem("players")) || []
    };
  }

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

  render() {
    return (
      <div className="players">
        <InputForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          value={this.state.name}
          length={this.state.players.length + 1}
        />

        {this.state.players.map((playerName, index) => {
          return (
            <PlayersList
              key={index}
              playerName={playerName}
              deletePlayer={this.deletePlayer}
            />
          );
        })}

        <Link className="btn btn-play" to="/truth-or-dare">
          Play
        </Link>
      </div>
    );
  }
}

export default Players;
