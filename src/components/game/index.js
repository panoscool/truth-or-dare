import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { truth, dare } from '../questions';
import CountdownTimer from '../timer';
import ShowQuest from './show-quest';

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
      currType: null,
    }
  }

  handleRandomTruth = () => {
    this.playerTurn();
    // let remTQuest = truth.filter(t => !t.hasGameeard)
    let randomNum = Math.floor(Math.random() * truth.length)
    this.setState({
      currQuest: truth[randomNum],
      currType: "Truth"
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
      currType: "Dare"
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
      <div className="tod">
        <div className="logo">
          <img alt="logo" src={`${process.env.PUBLIC_URL}/images/logo.png`} height="70" width="120" />
        </div>
        <div className="timer">
          <CountdownTimer />
        </div>

        <div className="questions">
           <ShowQuest 
              currQuest={this.state.currQuest} 
              currType={this.state.currType} 
              currPlayer={players[this.state.currPlayer]}
            />
        </div>

        <button className="btn btn-truth" onClick={this.handleRandomTruth}>Truth ({truth.length})</button>
        <button className="btn btn-dare" onClick={this.handleRandomDare}>Dare ({dare.length})</button>
        <Link className="btn btn-home" to="/">Home</Link>
      </div>
    );
  }
}

export default Game;
