import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import AdminForm from './AdminForm';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ConfirmationDialog from '../Shared/ConfirmationDialog';

const modals = {
  AdminForm,
  SignInForm,
  SignUpForm,
  ConfirmationDialog
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
