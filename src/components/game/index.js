import React, { Component } from 'react';
import { truth, dare } from '../questions';
import CountdownTimer from '../timer';
import ShowQuest from './show-quest';
import Players from '../players';

const players = [
  "Anna",
  "John",
  "Jackie",
  "Maria",
  "Sam",
  "Eliz"
]

class Game extends Component {
  constructor() {
    super();
    this.state = {
      currPlayer: -1,
      currQuest: null,
      currTitle: null,
    }
  }

  handleRandomTruth = () => {
    this.playerTurn();
    // let remTQuest = truth.filter(t => !t.hasGameeard)
    let randomNum = Math.floor(Math.random() * truth.length)
    this.setState({
      currQuest: truth[randomNum],
      currTitle: "Truth"
    })
    truth.splice(randomNum, 1)
    // truth[randomNum].hasAppeard = true
  }
  
  handleRandomDare = () => {
    this.playerTurn();
   // let remDQuest = dare.filter(d => !d.hasAppeard)
    let randomNum = Math.floor(Math.random() * dare.length)
    this.setState({
      currQuest: dare[randomNum],
      currTitle: "Dare"
    })
    dare.splice(randomNum, 1)
    // dare[randomNum].hasAppeard = true
  }

  playerTurn = () => {
    let index = this.state.currPlayer;
    index = index+1;

    if(players[index]) {
      this.setState({ currPlayer: index});
    } else {
      // next question
      this.setState({ currPlayer: 0 })
      // TODO: go to next question
    }
  }

  render() {
    //  {truth.map((quest, index) => <h3 key={index}>{quest.question}</h3>)}
    //  {dare.map((quest, index) => <h3 key={index}>{quest.question}</h3>)}
    return (
      <div className="App">
        <div className="timer">
          <CountdownTimer />
        </div>

        <div className="current-player">
           <h3>Player: {players[this.state.currPlayer]}</h3>
        </div>

        <div className="questions">
           <ShowQuest currQuest={this.state.currQuest} currTitle={this.state.currTitle} />
        </div>

        <button className="btn-truth" onClick={this.handleRandomTruth}>Truth ({truth.length})</button>
        <button className="btn-dare" onClick={this.handleRandomDare}>Dare ({dare.length})</button>
        <button className="btn-home" >Home</button>

        <Players />
      </div>
    );
  }
}

export default Game;
