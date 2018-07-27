import React, { Component } from 'react';
import PlayersList from './players-list';

class Players extends Component {
    constructor() {
        super();
        this.state = {
          name: '',
          players: []
        }
      }

    handleChange = (e) => {
        this.setState({ name: e.target.value })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        let newPlayer = this.state.players
        newPlayer.push(this.state.name)
        this.setState({
            name: ''
        })
    }

    deletePlayer = (index) => {
        let newPlayer = this.state.players
        newPlayer.splice(index, 1)
        this.setState({ players: newPlayer })
    }

    render() {
        let players = this.state.players.map((playerName, index) => {
            return <PlayersList key={index} playerName={playerName} deletePlayer={this.deletePlayer}
            /> });
        return(
            <div className="players">
                {players}
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="Add your name here"
                        onChange={this.handleChange}
                        value={this.state.value}
                    />
                    <button>Add #{this.state.players.length +1}</button>
                </form>
            </div>
        );
    }
}

export default Players;