import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import TextInput from '../Shared/TextInput';
import SocialLogin from './SocialLogin';
import { ThemeContext } from '../../context/ThemeContext';
import firebase from '../../config/firebase';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  error: {
    color: 'red'
  }
}));

function SignInForm() {
  const classes = useStyles();
  const { modal, setModal } = useContext(ThemeContext);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  async function handleUserLogin(event) {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(values.email, values.password);

      handleClose(null);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  }

  function handleClose() {
    setModal(null);
  }

  return (
    <Dialog open={Boolean(modal)} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Login
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <span className={classes.error}>{error && error}</span>
        <form onSubmit={handleUserLogin}>
          <TextInput
            required
            type="email"
            name='email'
            label="Email"
            value={values.email}
            handleChange={handleChange}
          />
          <TextInput
            required
            type="password"
            name='password'
            label="Password"
            value={values.password}
            handleChange={handleChange}
          />
          <Button fullWidth type='submit' color='primary' variant='contained'>Login</Button>
        </form>
        <SocialLogin />
      </DialogContent>
    </Dialog>
  );
}

export default SignInForm;
