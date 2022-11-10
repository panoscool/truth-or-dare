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
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({
    type: '',
    text: '',
  });

  function handleClose() {
    setOpen(false);
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
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Make admin
        <CloseButton aria-label="close" onClick={handleClose} size="large">
          <Close />
        </CloseButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Typography>{message.text}</Typography>

          <Box mt={4} mb={2} minWidth={300}>
            <TextField
              required
              name="email"
              label="Add email"
              placeholder="Add email"
              value={email || ''}
              onChange={handleChange}
            />
          </Box>
          <Button fullWidth type="submit" color="primary" variant="contained">
            Make admin
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AdminForm;
