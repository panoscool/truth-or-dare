import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="player">
            player name
          </div>
          <div className="next-player">
            next player
          </div>
          <div className="questions">
            questions
          </div>
          <button className="btn">&rarr;</button>
      </div>
    );
  }
}

export default App;
