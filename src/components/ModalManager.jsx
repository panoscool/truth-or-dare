import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import AdminForm from './Authentication/AdminForm';
import SignInForm from './Authentication/SignInForm';
import SignUpForm from './Authentication/SignUpForm';
import ConfirmExitDialog from './Shared/ConfirmExitDialog';

const modals = {
  AdminForm,
  SignInForm,
  SignUpForm,
  ConfirmExitDialog
};

function ModalManager() {
  const { modal } = useContext(ThemeContext);

  if (modal && modals[modal]) {
    const ModalComponent = modals[modal];
    return <ModalComponent />;
  }

  return null;
}

export default ModalManager;
