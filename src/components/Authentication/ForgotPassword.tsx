import { useState } from 'react';
import { Typography, Button, Box, TextField } from '@mui/material';
import useAuthentication from '../../hooks/useAuthentication';
import Layout from '../Layout';
import Loading from '../Shared/Loading';

function ForgotPassword() {
  const { resetPassword } = useAuthentication();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await resetPassword(email);

      setEmail('');
      setMessage({ type: 'success', text: 'Check your email for further instructions' });
    } catch (err) {
      console.error((err as any).message);
      setMessage({ type: 'error', text: 'Failed to reset password' });
    } finally {
      setLoading(false);
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
        <TextField
          required
          name="email"
          label="Add email"
          disabled={loading}
          placeholder="Add email"
          value={email}
          onChange={handleChange}
        />

        {loading && <Loading type="linear" />}

        <Box mt={2} pb={4}>
          <Button fullWidth type="submit" variant="contained" color="primary" disabled={loading}>
            Submit
          </Button>
        </Box>
      </form>
    </Layout>
  );
}

export default ForgotPassword;
