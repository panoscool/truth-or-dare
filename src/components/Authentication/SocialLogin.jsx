import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { ThemeContext } from '../../context/ThemeContext';
import firebase from '../../config/firebase';
import Facebook from '../Icons/Facebook';
import Google from '../Icons/Google';

const useStyles = makeStyles((theme) => ({
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
  const history = useHistory();
  const { setModal } = useContext(ThemeContext);

  async function handleSocialLogin(selectedProvider) {
    try {
      setModal(null);

      const provider = {
        facebook: new firebase.auth.FacebookAuthProvider(),
        google: new firebase.auth.GoogleAuthProvider()
      };

      await firebase.auth().signInWithPopup(provider[selectedProvider]);

      history.push('/');
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className={classes.root}>
      <Typography>- OR -</Typography>
      <Button onClick={() => handleSocialLogin('facebook')} startIcon={<Facebook />} className={classes.button} fullWidth color="primary" variant="outlined">Continue with Facebook</Button>
      <Button onClick={() => handleSocialLogin('google')} startIcon={<Google />} className={classes.button} fullWidth color="default" variant="outlined">Continue with Google</Button>
    </div>
  );
}

export default SocialLogin;
