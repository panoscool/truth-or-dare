import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import Home from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

function NotFoundPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h4">
        Page not found
      </Typography>
      <Typography variant="h6">
        Maybe the link you followed is wrong, mistyped or the page does not exist anymore.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<Home />}
        component={Link}
        to="/"
      >
        Go Home
      </Button>
    </div>
  );
}

export default NotFoundPage;
