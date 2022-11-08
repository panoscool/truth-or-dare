import { useState } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import Close from '@mui/icons-material/Close';
import TextInput from '../Shared/TextInput';
import { functions } from '../../config/firebase';
import useTheme from '../../hooks/useTheme';

function AdminForm() {
  const { modal, setModal } = useTheme();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({
    type: '',
    text: '',
  });

  function handleClose() {
    setModal(null);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email !== undefined && !email.trim()) return;

    try {
      const addAdminRole = functions.httpsCallable('addAdminRole');
      const response = await addAdminRole({ email });
      setMessage({ type: 'success', text: response.data.message });
      setEmail('');
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Missing or insufficient permissions.' });
    }
  }

  return (
    <Dialog open={Boolean(modal)} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Make admin
        <IconButton aria-label="close" onClick={handleClose} size="large">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Typography>{message.text}</Typography>
          <TextInput
            required
            name="email"
            label="Add email"
            placeholder="Add email"
            value={email || ''}
            onChange={handleChange}
          />
          <Button fullWidth type="submit" color="primary" variant="contained">
            Make admin
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AdminForm;
