import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import Close from '@material-ui//icons/Close';
import TextInput from '../Shared/TextInput';
import { functions } from '../../config/firebase';
import useTheme from '../../hooks/useTheme';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  button: {
    margin: theme.spacing(2, 0)
  },
  success: {
    color: theme.palette.success.main
  },
  error: {
    color: theme.palette.error.main
  }
}));

function AdminForm() {
  const classes = useStyles();
  const { modal, setModal } = useTheme();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({
    type: '',
    text: ''
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
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <Typography className={message.type === 'success' ? classes.success : classes.error}>{message.text}</Typography>
          <TextInput required name="email" label="Add email" placeholder="Add email" value={email || ''} handleChange={handleChange} />
          <Button fullWidth type="submit" color="primary" variant="contained" className={classes.button}>Make admin</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AdminForm;
