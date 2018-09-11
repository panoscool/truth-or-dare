import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Players from "./components/players";
import Game from "./components/game";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Players} />
            <Route path="/truth-or-dare" component={Game} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
