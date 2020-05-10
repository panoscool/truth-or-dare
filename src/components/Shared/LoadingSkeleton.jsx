import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  spacing: {
    margin: theme.spacing(2)
  }
}));

function LoadingSkeleton({ width, height }) {
  const classes = useStyles();

  return <div className={classes.spacing}><Skeleton variant='rect' width={width} height={height} /></div>;
}

export default LoadingSkeleton;
