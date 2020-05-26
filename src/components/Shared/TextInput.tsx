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

interface Props {
  type?: string;
  name: string;
  label: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  inputProps?: any;
  helperText?: any;
  handleChange: (e: any) => void;
}

function TextInput({ handleChange, inputProps, ...props }: Props) {
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
