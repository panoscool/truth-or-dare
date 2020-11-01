import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Paper } from '@material-ui/core';
import TextInput from '../Shared/TextInput';
import useAuthentication from '../../hooks/useAuthentication';

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
  const { resetPassword } = useAuthentication();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({
    type: '',
    text: ''
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
      console.error(err.message);
      setMessage({ type: 'error', text: 'Failed to reset password' });
    }
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.innerBlock}>
        <div className="title">Truth or Dare</div>
        <div className={classes.typography}>
          <Typography color='textPrimary'>Password Reset</Typography>
          <Typography color='textSecondary'>Add your registered email to reset you password.</Typography>
        </div>
        <Typography className={message.type === 'success' ? classes.success : classes.error}>{message.text}</Typography>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <TextInput required name="email" label="Add email" placeholder="Add email" value={email || ''} handleChange={handleChange} />
          <Button className={classes.button} fullWidth type='submit' variant='contained' color='primary'>Submit</Button>
        </form>
      </div>
    </Paper>
  );
}

export default RecoveryPage;
