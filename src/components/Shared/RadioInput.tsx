import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2, 0)
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row'
  },
  radioGroupVertical: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

interface Props {
  name: string;
  label: string
  value: string
  required?: boolean;
  disabled?: boolean;
  vertical?: boolean;
  optionsArray: Array<object>
  handleChange: (e: any) => void;
}

function RadioInput({ name, label, value, required, disabled, vertical, optionsArray, handleChange }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl disabled={disabled} required={required} component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          name={name}
          value={value}
          onChange={handleChange}
          className={vertical ? classes.radioGroupVertical : classes.radioGroup}
        >
          {optionsArray?.map((option: any) => (
            <FormControlLabel
              key={option.id}
              label={option.label}
              value={option.value}
              disabled={option.disabled}
              control={<Radio disabled={disabled} required={required} color="primary" />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RadioInput;
