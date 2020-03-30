import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import QuestionsPage from './components/Questions/QuestionsPage';
import QuestionsForm from './components/Questions/QuestionsForm';
import InformationPage from './components/InformationPage';
import NotFoundPage from './components/NotFoundPage';
import ModalManager from './components/Authentication/ModalManager';
import PrivacyPolicy from './components/PrivacyPolicy';
import { AuthContext } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';
import firebase from './config/firebase';

function App() {
  const { theme } = useContext(ThemeContext);
  const {
    setAuthenticated,
    setAdmin,
    setUserId,
    setDisplayName,
    setPhotoURL
  } = useContext(AuthContext);
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

  // Change theme color when user switches on/off dark mode
  document
    .querySelector('meta[name=theme-color]')
    .setAttribute('content', theme === 'light' ? '#ffffff' : '#000000');

  return (
    <div>
      <ModalManager />
      <Navbar />
      <Switch>
        <Route path="/game" component={GamePage} />
        <Route
          path={['/create/:id/:url', '/create']}
          component={QuestionsForm}
        />
        <Route path="/questions" component={QuestionsPage} />
        <Route path="/information" component={InformationPage} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
