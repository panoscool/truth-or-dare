import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: '100%',
    margin: theme.spacing(2, 0)
  }
}));

interface Props {
  name: string;
  label: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  optionsArray: Array<object>
  handleChange: (e: any) => void;
}

function SelectForm({ name, label, value, required, disabled, optionsArray, handleChange }: Props) {
  const classes = useStyles();

  return (
    <FormControl required={required} disabled={disabled} variant="outlined" margin="dense" className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} name={name} value={value} onChange={handleChange}>
        {optionsArray?.map((option: any) => (
          <MenuItem key={option.id} value={option.value} disabled={option.disabled}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectForm;
