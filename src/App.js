import React, { Component } from 'react';
import { truth, dare } from './components/questions';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
            <div className="timer">
              <h3>timer</h3>
            </div>
            <div className="current-player">
              <h3>current player</h3>
            </div>
            <div className="next-player">
              <h3>next player</h3>
          </div>
          <div className="questions">
            {truth.map((quest, index) => <h3 key={index}>{quest.question}</h3>)}
            {dare.map((quest, index) => <h3 key={index}>{quest.question}</h3>)}
          </div>
          <button className="btn">&rarr;</button>
      </div>
    );
  }
}

export default App;
