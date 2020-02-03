import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from '../Shared/TextInput';
import SocialLogin from './SocialLogin';
import { AuthContext } from '../../context/AuthContext';
import firebase from '../../config/firebase';

function SignInForm() {
  const { modal, setModal } = useContext(AuthContext);
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
      console.error(err);
    }
  }

  function handleClose() {
    setModal(null);
  }

  return (
    <div>
      <Dialog open={Boolean(modal)} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <form onSubmit={handleUserLogin}>
            <TextInput
              autoFocus
              type="email"
              name='email'
              label="Email"
              value={values.email}
              handleChange={handleChange}
            />
            <TextInput
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
    </div>
  );
}

export default SignInForm;
