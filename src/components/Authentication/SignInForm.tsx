import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function SignInForm() {
  const navigate = useNavigate();
  const { modal, setModal } = useTheme();
  const { signin } = useAuthentication();
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  function handleClose() {
    setModal(null);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function hanndleForgotPassword() {
    navigate('/recovery');
    handleClose();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await signin(values.email, values.password);

      handleClose();
    } catch (err) {
      console.error((err as any).message);
      setError((err as any).message);
    }
  }

  return (
    <Dialog open={Boolean(modal)} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Login
        <IconButton aria-label="close" onClick={handleClose} size="large">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <span>{error && error}</span>
        <form onSubmit={handleSubmit} autoComplete="off">
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
            helperText={<span onClick={hanndleForgotPassword}>Forgot password?</span>}
          />
          <Button fullWidth type="submit" color="primary" variant="contained">
            Login
          </Button>
        </form>
        <SocialLogin />
      </DialogContent>
    </Dialog>
  );
}

export default SignInForm;
