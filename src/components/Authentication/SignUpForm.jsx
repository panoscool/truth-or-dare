import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from '../Shared/TextInput';
import SocialLogin from './SocialLogin';
import { AuthContext } from '../../context/AuthContext';
import firebase from '../../config/firebase';

function SignUpForm() {
  const { modal, setModal } = useContext(AuthContext);
  const [values, setValues] = useState({
    displayName: '',
    email: '',
    password: ''
  });

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  async function handleUserRegister(event) {
    event.preventDefault();

    try {
      const createdUser = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
      await createdUser.user.updateProfile({ displayName: values.displayName });

      handleClose(false);
    } catch (err) {
      console.log(err);
    }
  }

  function handleClose() {
    setModal(false);
  };

  return (
    <div>
      <Dialog open={Boolean(modal)} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent>
          <form onSubmit={handleUserRegister}>
            <TextInput
              autoFocus
              type="text"
              name='displayName'
              label="Name"
              value={values.displayName}
              handleChange={handleChange}
            />
            <TextInput
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
            <Button fullWidth type='submit' color='primary' variant='contained'>Register</Button>
          </form>
          <SocialLogin />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SignUpForm;
