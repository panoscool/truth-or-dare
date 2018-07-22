import React, { Component } from 'react';
import { truth, dare } from './components/questions';
import CountdownTimer from './components/countdown';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currQuest: null,
    }
  }
  
    handleRandomTruth = () => {
      let remTQuest = truth.filter(t => !t.hasAppeard);
      let randomNum = Math.floor(Math.random() * remTQuest.length);
      this.setState({
        currQuest: remTQuest[randomNum]
      })
      truth[randomNum].hasAppeard = true
    }
  
    handleRandomDare = () => {
      let remDQuest = dare.filter(d => !d.hasAppeard);
      let randomNum = Math.floor(Math.random() * remDQuest.length);
      this.setState({
      currQuest: remDQuest[randomNum]
      })
      dare[randomNum].hasAppeard = true
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
             {this.state.currQuest ? <div>{this.state.currQuest.question}</div> : ''}
          </div>

          <button className="btn-truth" onClick={this.handleRandomTruth}>Truth (questLeft 0)</button>
          <button className="btn-dare" onClick={this.handleRandomDare}>Dare (questLeft 0)</button>
          <button className="btn-home" >Home</button>
      </div>
    );
  }
}

export default App;
