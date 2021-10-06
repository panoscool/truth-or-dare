import React, { useEffect, Fragment } from 'react';
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
import Spinner from './components/Shared/Spinner';
import useAuthentication from './hooks/useAuthentication';
import { analytics } from './config/firebase';
import useTheme from './hooks/useTheme';

function App() {
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const { loading } = useAuthentication();

  useEffect(() => {
    let page_location = pathname;
    let page_referrer = document.referrer;

    analytics.logEvent('page_view', { page_location, page_referrer });
  }, [pathname]);

  // @ts-ignore - Change theme color when user switches on/off dark mode
  document
    .querySelector('meta[name=theme-color]')
    .setAttribute('content', theme === 'light' ? '#ffffff' : '#000000');

  if (loading) return <Spinner thickness={1} />;

  return (
    <Fragment>
      <ModalManager />
      <Navbar />
      <Switch>
        <Route path="/game" component={GamePage} />
        <Route path={['/update/:type/:id', '/create']} component={QuestionsForm} />
        <PrivateRoute path="/questions" component={QuestionsPage} />
        <Route path="/information" component={InformationPage} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <PublicRoute path="/recovery" component={RecoveryPage} />
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Fragment>
  );
}

export default App;
