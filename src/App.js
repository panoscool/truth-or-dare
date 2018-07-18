import React, { Component } from 'react';
import { truth, dare } from './components/questions';
import './App.css';
import CountdownTimer from './components/timer/countdown';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currQuest: null
    }
  }
  
    handleRandomTruth = () => {
      this.setState({
      currQuest: truth[Math.floor(Math.random() * truth.length)]
      })
    }
  
    handleRandomDare = () => {
      this.setState({
      currQuest: dare[Math.floor(Math.random() * dare.length)]
      })
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

          <button className="btn-truth" onClick={this.handleRandomTruth}>Truth</button>
          <button className="btn-dare" onClick={this.handleRandomDare}>Dare</button>
          <button className="btn-home" >Home</button>
      </div>
    );
  }
}

export default App;
