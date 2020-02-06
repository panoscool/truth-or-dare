import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import firebase from '../../config/firebase';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    margin: theme.spacing(2, 0)
  },
  button: {
    margin: theme.spacing(1, 0)
  }
}));

function SocialLogin() {
  const classes = useStyles();
  const { setModal } = useContext(AuthContext);

  async function handleSocialLogin(selectedProvider) {
    try {
      setModal(null);

      const provider = {
        facebook: new firebase.auth.FacebookAuthProvider(),
        google: new firebase.auth.GoogleAuthProvider()
      };

      await firebase.auth().signInWithPopup(provider[selectedProvider]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={classes.root}>
      <Typography>- OR -</Typography>
      <Button onClick={() => handleSocialLogin('facebook')} className={classes.button} fullWidth color="primary" variant="outlined">Continue with Facebook</Button>
      <Button onClick={() => handleSocialLogin('google')} className={classes.button} fullWidth color="default" variant="outlined">Continue with Google</Button>
    </div>
  );
}

export default SocialLogin;
