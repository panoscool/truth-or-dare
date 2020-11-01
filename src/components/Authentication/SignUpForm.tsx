import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import TextInput from '../Shared/TextInput';
import SocialLogin from './SocialLogin';
import useAuthentication from '../../hooks/useAuthentication';
import useTheme from '../../hooks/useTheme';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  error: {
    color: theme.palette.error.main
  }
}));

function SignUpForm() {
  const classes = useStyles();
  const { modal, setModal } = useTheme();
  const { signup } = useAuthentication();
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    displayName: '',
    email: '',
    password: ''
  });

  function handleClose() {
    setModal(null);
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      // It has effect, otherwise createdUser will be undefined
      const createdUser = await signup(values.email, values.password);
      // @ts-ignore
      await createdUser.user.updateProfile({ displayName: values.displayName });

      handleClose();
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  }

  return (
    <Dialog open={Boolean(modal)} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Register
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <span className={classes.error}>{error && error}</span>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <TextInput
            required
            type="text"
            name='displayName'
            label="Name"
            value={values.displayName}
            handleChange={handleChange}
          />
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
            type='password'
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
  );
}

export default SignUpForm;
