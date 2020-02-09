import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import QuestionsPage from './components/Questions/QuestionsPage';
import QuestionsForm from './components/Questions/QuestionsForm';
import AdminForm from './components/AdminForm';
import InformationPage from './components/InformationPage';
import NotFoundPage from './components/NotFoundPage';
import ModalManager from './components/Authentication/ModalManager';
import firebase from './config/firebase';
import { AuthContext } from './context/AuthContext';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const { setAuthenticated, setAdmin, setUserId, setDisplayName, setPhotoURL } = useContext(AuthContext);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        setAdmin(idTokenResult.claims.admin);
      });
      setAuthenticated(true);
      setUserId(user.uid);
      setDisplayName(user.displayName);
      setPhotoURL(user.photoURL);
    } else {
      setAuthenticated(false);
    }
  });

  return (
    <div>
      <ModalManager />
      <Navbar />
      <Switch>
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/admin" component={AdminForm} />
        <Route path="/questions" component={QuestionsPage} />
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
