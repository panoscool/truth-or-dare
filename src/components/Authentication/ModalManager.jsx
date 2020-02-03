import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../context/AuthContext';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    maxHeight: 435,
    margin: theme.spacing(2)
  },
}));

const modals = {
  SignInForm,
  SignUpForm
};

function ModalManager() {
  const classes = useStyles();
  const { modal } = useContext(AuthContext);

  if (modal && modals[modal]) {
    const ModalComponent = modals[modal];
    return <ModalComponent classes={{ paper: classes.paper }} />;
  }

  return null;
};

export default ModalManager;
