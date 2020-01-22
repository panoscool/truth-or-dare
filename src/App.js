import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import QuestionsForm from './components/QuestionsForm';
import RulesPage from './components/RulesPage';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/game" component={GamePage} />
        <Route path="/create" component={QuestionsForm} />
        <Route path="/information" component={RulesPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
