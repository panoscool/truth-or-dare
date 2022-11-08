import { useEffect, Fragment } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import HomePage from './components/Home/HomePage';
import GamePage from './components/Game/GamePage';
import QuestionsPage from './components/Questions/QuestionsPage';
import QuestionsForm from './components/Questions/QuestionsForm';
import InformationPage from './components/Information/InformationPage';
import PrivacyPolicy from './components/Information/PrivacyPolicy';
import LoginForm from './components/Authentication/LoginForm';
import RegisterForm from './components/Authentication/RegisterForm';
import ForgotPassword from './components/Authentication/ForgotPassword';
import NotFoundPage from './components/NotFoundPage';
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
    const page_location = pathname;
    const page_referrer = document.referrer;

    analytics.logEvent('page_view', { page_location, page_referrer });
  }, [pathname]);

  // @ts-ignore - Change theme color when user switches on/off dark mode
  document
    .querySelector('meta[name=theme-color]')
    .setAttribute('content', theme === 'light' ? '#ffffff' : '#000000');

  if (loading) return <Spinner thickness={1} />;

  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/update/:type/:id" element={<QuestionsForm />} />
        <Route path="/create" element={<QuestionsForm />} />
        <Route
          path="/questions"
          element={
            <PrivateRoute redirectTo="/">
              <QuestionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute redirectTo="/">
              <RegisterForm />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute redirectTo="/">
              <LoginForm />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute redirectTo="/">
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
