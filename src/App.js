import React, { useContext, useEffect, Fragment } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import QuestionsPage from './components/Questions/QuestionsPage';
import QuestionsForm from './components/Questions/QuestionsForm';
import InformationPage from './components/InformationPage';
import NotFoundPage from './components/NotFoundPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import ModalManager from './components/ModalManager';
import { AuthContext } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';
import firebase from './config/firebase';

function App() {
  const { pathname } = useLocation();
  const { theme } = useContext(ThemeContext);
  const { setUser, setAdmin } = useContext(AuthContext);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        setAdmin(idTokenResult.claims.admin);
      });
      setUser(user);
    } else {
      setUser(null);
      setAdmin(false);
    }
  });

  useEffect(() => {
    let page_location = pathname;
    let page_referrer = document.referrer;

    firebase.analytics().logEvent('page_view', { page_location, page_referrer });
  }, [pathname]);

  // Change theme color when user switches on/off dark mode
  document.querySelector('meta[name=theme-color]').setAttribute('content', theme === 'light' ? '#ffffff' : '#000000');

  return (
    <Fragment>
      <ModalManager />
      <Navbar />
      <Switch>
        <Route path="/game" component={GamePage} />
        <Route path={['/create/:id/:url', '/create']} component={QuestionsForm} />
        <Route path="/questions" component={QuestionsPage} />
        <Route path="/information" component={InformationPage} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Fragment>
  );
}

export default App;
