import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import HomePage from './components/Home/HomePage';
import GamePage from './components/Game/GamePage';
import QuestionsPage from './components/Questions/QuestionsPage';
import QuestionsForm from './components/Questions/QuestionsForm';
import InformationPage from './components/Information/InformationPage';
import PrivacyPolicy from './components/Information/PrivacyPolicy';
import RecoveryPage from './components/Authentication/RecoveryPage';
import NotFoundPage from './components/NotFoundPage';
import ModalManager from './components/ModalManager';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import LoadingSkeleton from './components/Shared/LoadingSkeleton';
import { AuthContext } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';
import firebase from './config/firebase';

function App() {
  const { pathname } = useLocation();
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const { setUser, setAdmin } = useContext(AuthContext);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        setAdmin(idTokenResult.claims.admin);
      });
      setUser(user);
      setLoading(false);
    } else {
      setUser(null);
      setAdmin(false);
      setLoading(false);
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
      {!loading ?
        <Switch>
          <Route path="/game" component={GamePage} />
          <Route path={['/create/:id/:url', '/create']} component={QuestionsForm} />
          <PrivateRoute path="/questions" component={QuestionsPage} />
          <Route path="/information" component={InformationPage} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <PublicRoute path='/recovery' component={RecoveryPage} />
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
        : <LoadingSkeleton height={500} />}
    </Fragment>
  );
}

export default App;
