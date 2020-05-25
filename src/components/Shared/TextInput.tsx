import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    minWidth: 120,
    width: '100%',
    margin: theme.spacing(2, 0)
  }
}));

function TextInput({ handleChange, inputProps, ...props }) {
  const classes = useStyles();

  return (
    <TextField
      {...props}
      fullWidth
      margin="dense"
      variant="outlined"
      inputProps={inputProps}
      onChange={handleChange}
      className={classes.textField}
    />
  );
}

export default TextInput;
