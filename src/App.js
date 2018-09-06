import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Players from './components/players';
import Game from './components/game';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path='/' component={Players} />
          <Route path='/truth-or-dare' component={Game} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;