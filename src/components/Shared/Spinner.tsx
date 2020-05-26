import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  progress: {
    textAlign: 'center',
    margin: theme.spacing(2)
  }
}));

interface Props {
  thickness: number;
}

function Spinner({ thickness }: Props) {
  const classes = useStyles();

  return <div className={classes.progress}><CircularProgress color='inherit' thickness={thickness} /></div>;
}

export default Spinner;
