import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import AdminForm from './AdminForm';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import LeaderboardModal from '../LeaderboardModal';

const modals = {
  AdminForm,
  SignInForm,
  SignUpForm,
  LeaderboardModal
};

function ModalManager() {
  const { modal } = useContext(ThemeContext);

  if (modal && modals[modal]) {
    const ModalComponent = modals[modal];
    return <ModalComponent />;
  }

  return null;
};

export default ModalManager;
