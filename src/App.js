import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import QuestionsForm from './components/QuestionsForm';
import InformationPage from './components/InformationPage';
import NotFoundPage from './components/NotFoundPage';
import ModalManager from './components/Authentication/ModalManager';
import firebase from './config/firebase';
import { AuthContext } from './context/AuthContext';

function App() {
  const { setAuthenticated, setUserId } = useContext(AuthContext);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true);
      setUserId(user.uid);
    } else {
      setAuthenticated(false);
    }
  });

  return (
    <div>
      <ModalManager />
      <Navbar />
      <Switch>
        <Route path="/game" component={GamePage} />
        <Route path="/create" component={QuestionsForm} />
        <Route path="/information" component={InformationPage} />
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
