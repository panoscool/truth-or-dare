import React, { Component } from 'react';
import { truth, dare } from './components/questions';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      timer: 0,
    }
  }

  increment = () => {
    this.setState({timer: this.state.timer +1})
  }

  decrement = () => {
    this.setState({timer: this.state.timer -1})
  }

  render() {
    return (
      <div className="App">
            <div className="timer">
              <button className="btn-timer" onClick={this.decrement}>-</button>
                {this.state.timer}
              <button className="btn-timer" onClick={this.increment}>+</button> 
              <br />
              <button className="btn-start">Start</button>
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
          <button className="btn-truth">Truth</button>
          <button className="btn-dare">Dare</button>
      </div>
    );
  }
}

export default App;
