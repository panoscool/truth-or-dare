import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
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
  const { modal } = useContext(AuthContext);

  if (modal && modals[modal]) {
    const ModalComponent = modals[modal];
    return <ModalComponent />;
  }

  return null;
};

export default ModalManager;
