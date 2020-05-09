import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Paper } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import TextInput from '../Shared/TextInput';
import firebase from '../../config/firebase';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  innerBlock: {
    width: 620,
    textAlign: 'center'
  },
  button: {
    marginBottom: theme.spacing(2)
  },
  typography: {
    padding: theme.spacing(4, 0)
  },
  success: {
    color: theme.palette.success.main
  },
  error: {
    color: theme.palette.error.main
  }
}));

function RecoveryPage() {
  const classes = useStyles();
  const { authenticated } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({
    type: '',
    text: ''
  });

  function handleChange(event) {
    setEmail(event.target.value);
  }

  async function handlePasswordReset(event) {
    event.preventDefault();

    try {
      await firebase.auth().sendPasswordResetEmail(email);

      setEmail('');
      setMessage({ type: 'success', text: 'Please check your email and follow the instractions.' });
    } catch (err) {
      console.error(err.message);
      setMessage({ type: 'error', text: 'Something went wrong, please check your email and try again.' });
    }
  }

  return (
    <Paper className={classes.paper}>
      {authenticated && <Redirect to='/' />}
      <div className={classes.innerBlock}>
        <div className="title">Truth or Dare</div>
        <div className={classes.typography}>
          <Typography color='textPrimary'>Password Recovery</Typography>
          <Typography color='textSecondary'>Add your registered email to reset you password.</Typography>
        </div>
        <Typography className={message.type === 'success' ? classes.success : classes.error}>{message.text}</Typography>
        <form onSubmit={handlePasswordReset} autoComplete='off'>
          <TextInput required name="email" label="Add email" placeholder="Add email" value={email || ''} handleChange={handleChange} />
          <Button className={classes.button} fullWidth type='submit' variant='contained' color='primary'>Submit</Button>
        </form>
      </div>
    </Paper>
  );
}

export default RecoveryPage;
