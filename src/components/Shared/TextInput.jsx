import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { ThemeContext } from '../../context/ThemeContext';

const useStyles = makeStyles((theme) => ({
  textField: {
    minWidth: 120,
    width: '100%',
    margin: theme.spacing(2, 0)
  },
  iconLight: {
    color: theme.palette.grey[400]
  },
  iconDark: {
    color: theme.palette.grey[600]
  }
}));

function TextInput({ handleChange, handleShowPassword, inputProps, icon, showPassword, ...props }) {
  const classes = useStyles();
  const { theme } = useContext(ThemeContext);

  const iconStyle = theme === 'dark' ? classes.iconDark : classes.iconLight;

  const InputProps = {
    endAdornment: <InputAdornment position="end">
      <IconButton onClick={handleShowPassword} edge="end">
        {!showPassword ? <Visibility className={iconStyle} /> : <VisibilityOff className={iconStyle} />}
      </IconButton>
    </InputAdornment>
  };

  return (
    <TextField
      {...props}
      fullWidth
      margin="dense"
      variant="outlined"
      inputProps={inputProps}
      onChange={handleChange}
      className={classes.textField}
      InputProps={icon ? InputProps : null}
    />
  );
}

export default TextInput;
