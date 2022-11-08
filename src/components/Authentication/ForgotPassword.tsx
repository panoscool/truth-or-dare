import { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import TextInput from '../Shared/TextInput';
import useAuthentication from '../../hooks/useAuthentication';
import Layout from '../Layout';

function ForgotPassword() {
  const { resetPassword } = useAuthentication();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({
    type: '',
    text: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await resetPassword(email);

      setEmail('');
      setMessage({ type: 'success', text: 'Check your inbox for further instractions' });
    } catch (err) {
      console.error((err as any).message);
      setMessage({ type: 'error', text: 'Failed to reset password' });
    }
  }

  return (
    <Layout>
      <Typography variant="h6" textAlign="center" pt={4} pb={2}>
        Forgot Password
      </Typography>
      <Typography color="textSecondary" textAlign="center" pb={8}>
        Add your registered email to reset you password.
      </Typography>
      <Typography>{message.text}</Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextInput
          required
          name="email"
          label="Add email"
          placeholder="Add email"
          value={email || ''}
          onChange={handleChange}
        />
        <Box mt={2} pb={4}>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Layout>
  );
}

export default ForgotPassword;
