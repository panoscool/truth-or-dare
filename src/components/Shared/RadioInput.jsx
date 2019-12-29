import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing(1, 3)
  }
}));

function RadioInput(props) {
  const classes = useStyles();

  const { name, value, optionsArray, handleChange } = props;
  return (
    <div className={classes.root}>
      <FormControl component='fieldset' className={classes.formControl}>
        <RadioGroup
          aria-label='radio-buttons'
          name={name}
          value={value}
          onChange={handleChange}
        >
          {optionsArray.map((option) => (
            <FormControlLabel
              key={option.id}
              label={option.label}
              value={option.value}
              control={<Radio color='primary' />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RadioInput;
