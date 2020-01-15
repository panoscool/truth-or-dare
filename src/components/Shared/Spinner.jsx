import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(2)
  },
  center: {
    textAlign: 'center'
  }
}));

function Spinner() {
  const classes = useStyles();

  return <div className={classes.center}><CircularProgress className={classes.progress} /></div>;
}

export default Spinner;
