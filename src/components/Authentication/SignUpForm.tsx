import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import TextInput from '../Shared/TextInput';
import SocialLogin from './SocialLogin';
import useAuthentication from '../../hooks/useAuthentication';
import useTheme from '../../hooks/useTheme';

function SignUpForm() {
  const { modal, setModal } = useTheme();
  const { signup } = useAuthentication();
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    displayName: '',
    email: '',
    password: '',
  });

  function handleClose() {
    setModal(null);
  }

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
      console.error((err as any).message);
      setError((err as any).message);
    }
  }

  return (
    <Dialog open={Boolean(modal)} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Register
        <IconButton aria-label="close" onClick={handleClose} size="large">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <span>{error && error}</span>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextInput
            required
            type="text"
            name="displayName"
            label="Name"
            value={values.displayName}
            onChange={handleChange}
          />
          <TextInput
            required
            type="email"
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
          />
          <TextInput
            required
            type="password"
            name="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
          />
          <Button fullWidth type="submit" color="primary" variant="contained">
            Register
          </Button>
        </form>
        <SocialLogin />
      </DialogContent>
    </Dialog>
  );
}

export default SignUpForm;
