import React, { Component } from 'react';
import PlayersList from './list';
import InputForm from './input-form';

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
        if(!this.state.name.trim()) { return }
        let newPlayer = this.state.players
        newPlayer.push(this.state.name)
        this.setState({
            name: '',
            players: newPlayer
        })
    }

    deletePlayer = (index) => {
        let newPlayer = this.state.players
        newPlayer.splice(index, 1)
        this.setState({ players: newPlayer })
    }

    render() {
        return(
            <div className="players">
                {this.state.players.map((playerName, index) => {
                    return <PlayersList 
                    key={index} 
                    playerName={playerName} 
                    deletePlayer={this.deletePlayer}
            /> })}
            <InputForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                value={this.state.value}
                length={this.state.players.length +1}
            />
            <button className="play">Play</button>
            </div>
        );
    }
}

export default Players;