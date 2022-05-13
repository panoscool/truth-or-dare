import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Google from '../Icons/Google';
import Twitter from '../Icons/Twitter';
import useAuthentication from '../../hooks/useAuthentication';
import useTheme from '../../hooks/useTheme';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    gap: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
}));

function SocialLogin() {
  const classes = useStyles();
  const { setModal } = useTheme();
  const { socialLogin } = useAuthentication();

  async function handleSocialLogin(selectedProvider: any) {
    try {
      setModal(null);

      await socialLogin(selectedProvider);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={classes.root}>
      <Typography>- OR -</Typography>
      <Button
        onClick={() => handleSocialLogin('google')}
        startIcon={<Google height="28px" />}
        variant="outlined"
        fullWidth
      >
        Continue with Google
      </Button>

      <Button
        onClick={() => handleSocialLogin('twitter')}
        startIcon={<Twitter height="28px" />}
        variant="outlined"
        fullWidth
      >
        Continue with Twitter
      </Button>
    </div>
  );
}

export default SocialLogin;
