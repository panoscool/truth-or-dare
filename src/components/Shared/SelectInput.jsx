import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    width: '100%',
    margin: theme.spacing(2, 0)
  }
}));

function SelectForm(props) {
  const classes = useStyles();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const { name, value, optionsArray, label, required, disabled, handleChange } = props;

  return (
    <FormControl required={required} disabled={disabled} variant="outlined" margin="dense" className={classes.formControl}>
      <InputLabel ref={inputLabel}>{label}</InputLabel>
      <Select value={value} onChange={handleChange} input={<OutlinedInput labelWidth={labelWidth} name={name} />}>
        {optionsArray &&
          optionsArray.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default SelectForm;
