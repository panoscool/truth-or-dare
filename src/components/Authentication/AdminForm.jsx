import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import Close from '@material-ui//icons/Close';
import TextInput from '../Shared/TextInput';
import { AuthContext } from '../../context/AuthContext';
import firebase from '../../config/firebase';

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
  error: {
    color: 'red'
  }
}));

function AdminForm({ ...other }) {
  const classes = useStyles();
  const { modal, setModal } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({
    type: "",
    text: ""
  });

  function handleChange(event) {
    setEmail(event.target.value);
  }

  function handleClose() {
    setModal(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (email !== undefined && !email.trim()) return;

    try {
      const addAdminRole = firebase.functions().httpsCallable("addAdminRole");
      const response = await addAdminRole({ email });
      setMessage({ type: "success", text: response.data.message });
      setEmail("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Dialog open={Boolean(modal)} onClose={handleClose} {...other}>
        <DialogTitle id="form-dialog-title">
          Make admin
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Typography className={message.type === "success" ? classes.success : classes.error}>{message.text}</Typography>
            <TextInput required name="email" label="Add email" placeholder="Add email" value={email || ''} handleChange={handleChange} />
            <Button fullWidth type="submit" color="primary" variant="contained" className={classes.button}>Make admin</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminForm;
