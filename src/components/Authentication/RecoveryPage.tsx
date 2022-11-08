import { useState } from 'react';
import { Typography, Button, Paper } from '@mui/material';
import TextInput from '../Shared/TextInput';
import useAuthentication from '../../hooks/useAuthentication';

function RecoveryPage() {
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
    <Paper>
      <div className="title">Truth or Dare</div>
      <Typography color="textPrimary">Password Reset</Typography>
      <Typography color="textSecondary">
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
        <Button fullWidth type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Paper>
  );
}

export default RecoveryPage;
