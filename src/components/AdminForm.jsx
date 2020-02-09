import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextInput from './Shared/TextInput';
import firebase from '../config/firebase';

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  formGroup: {
    maxWidth: 420,
    textAlign: "center",
    margin: theme.spacing(3)
  },
}));

function AdminForm() {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  function handleChange(event) {
    setEmail(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (email !== undefined && !email.trim()) return;

    try {
      const addAdminRole = firebase.functions().httpsCallable("addAdminRole");
      const response = await addAdminRole({ email });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  const disabled = email !== undefined && !email.trim();

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit} className={classes.formGroup}>
        <Typography variant="h6" className={classes.title}>Make Admin</Typography>
        <TextInput
          name="email"
          label="Add email"
          placeholder="Add email"
          value={email || ''}
          handleChange={handleChange}
        />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          disabled={disabled}
          className={classes.button}
        >
          Make admin
      </Button>
      </form>
    </Paper>
  );
}

export default AdminForm;
