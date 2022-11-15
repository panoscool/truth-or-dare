import { useState } from 'react';
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import { functions } from '../../config/firebase';
import { styled } from '@mui/material/styles';
import Loading from '../Shared/Loading';

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
}));

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminForm({ open, setOpen }: Props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({
    type: '',
    text: '',
  });

  function handleClose() {
    setEmail('');
    setMessage({ type: '', text: '' });
    setOpen(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  async function handleRemoveAdmin() {
    if (email !== undefined && !email.trim()) return;

    try {
      setLoading(true);
      setMessage({ type: '', text: '' });
      const removeAdminRole = functions.httpsCallable('removeAdminRole');
      const response = await removeAdminRole({ email });

      setMessage({ type: 'success', text: response.data.message });
      setEmail('');
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Missing or insufficient permissions.' });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email !== undefined && !email.trim()) return;

    try {
      setLoading(true);
      setMessage({ type: '', text: '' });
      const addAdminRole = functions.httpsCallable('addAdminRole');
      const response = await addAdminRole({ email });

      setMessage({ type: 'success', text: response.data.message });
      setEmail('');
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Missing or insufficient permissions.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Admin
        <CloseButton aria-label="close" onClick={handleClose} size="large">
          <Close />
        </CloseButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Typography>{message.text}</Typography>

          <Box my={4} minWidth={300}>
            <TextField
              required
              type="email"
              name="email"
              label="Add email"
              disabled={loading}
              placeholder="Add email"
              value={email}
              onChange={handleChange}
            />
          </Box>

          {loading && <Loading type="linear" />}

          <Box display="flex" gap={2}>
            <Button
              fullWidth
              type="button"
              color="secondary"
              variant="contained"
              disabled={loading}
              onClick={handleRemoveAdmin}
            >
              Remove admin
            </Button>
            <Button fullWidth type="submit" color="primary" variant="contained" disabled={loading}>
              Make admin
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AdminForm;
