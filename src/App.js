import React, { Component } from 'react';
import { truth, dare } from './components/questions';
import './App.css';
import CountdownTimer from './components/countdown';
import ShowQuest from './components/show-quest';
import Players from './components/players';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currQuest: null,
      currTitle: null,
    }
  }
  
  handleRandomTruth = () => {
    // let remTQuest = truth.filter(t => !t.hasAppeard)
    let randomNum = Math.floor(Math.random() * truth.length)
    this.setState({
      currQuest: truth[randomNum],
      currTitle: "Truth"
    })
    truth.splice(randomNum, 1)
    // truth[randomNum].hasAppeard = true
  }
  
  handleRandomDare = () => {
   // let remDQuest = dare.filter(d => !d.hasAppeard)
    let randomNum = Math.floor(Math.random() * dare.length)
    this.setState({
      currQuest: dare[randomNum],
      currTitle: "Dare"
    })
    dare.splice(randomNum, 1)
    // dare[randomNum].hasAppeard = true
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
           <h3>current player</h3>
        </div>

        <div className="next-player">
          <h3>next player</h3>
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

export default App;
