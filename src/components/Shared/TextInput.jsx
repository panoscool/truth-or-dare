import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    minWidth: 120,
    width: '100%'
  },
  dense: {
    marginTop: theme.spacing(2)
  }
}));

function TextInput({ handleChange, inputProps, ...props }) {
  const classes = useStyles();

  return (
    <TextField
      id='outlined-dense'
      margin='dense'
      variant='outlined'
      {...props}
      fullWidth
      inputProps={inputProps}
      onChange={handleChange}
      className={clsx(classes.textField, classes.dense)}
    />
  );
}

export default TextInput;
