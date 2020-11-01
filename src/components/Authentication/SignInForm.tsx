import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  link: {
    cursor: 'pointer'
  },
  error: {
    color: theme.palette.error.main
  }
}));

function SignInForm() {
  const classes = useStyles();
  const history = useHistory();
  const { modal, setModal } = useTheme();
  const { signin } = useAuthentication();
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  function handleClose() {
    setModal(null);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function hanndleForgotPassword() {
    history.push('/recovery');
    handleClose();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await signin(values.email, values.password);

      handleClose();
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
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
        <form onSubmit={handleSubmit} autoComplete='off'>
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
            helperText={<span onClick={hanndleForgotPassword} className={classes.link}>Forgot password?</span>}
          />
          <Button fullWidth type='submit' color='primary' variant='contained'>Login</Button>
        </form>
        <SocialLogin />
      </DialogContent>
    </Dialog>
  );
}

export default SignInForm;
