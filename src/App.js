import React, { Component } from 'react';
import { truth, dare } from './components/questions';
import './App.css';
import CountdownTimer from './components/countdown';
import ShowQuest from './components/show-quest';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currQuest: null,
    }
  }
  
    handleRandomTruth = () => {
     // let remTQuest = truth.filter(t => !t.hasAppeard)
      let remTQuest = truth.splice(randomNum, 1)
      let randomNum = Math.floor(Math.random() * remTQuest.length)
      this.setState({
        currQuest: remTQuest[randomNum]
      })
      // truth[randomNum].hasAppeard = true
    }
  
    handleRandomDare = () => {
     // let remDQuest = dare.filter(d => !d.hasAppeard)
      let remDQuest = dare.splice(randomNum, 1)
      let randomNum = Math.floor(Math.random() * remDQuest.length)
      this.setState({
        currQuest: remDQuest[randomNum]
      })
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
             <ShowQuest currQuest={this.state.currQuest}/>
          </div>

          <button className="btn-truth" onClick={this.handleRandomTruth}>Truth ({truth.length})</button>
          <button className="btn-dare" onClick={this.handleRandomDare}>Dare ({dare.length})</button>
          <button className="btn-home" >Home</button>
      </div>
    );
  }
}

export default App;
