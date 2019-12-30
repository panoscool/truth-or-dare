import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    margin: theme.spacing(1, 2)
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row'
  },
  radioGroupVertical: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

function RadioInput(props) {
  const classes = useStyles();

  const { vertical, name, value, optionsArray, handleChange } = props;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="radio-buttons"
          name={name}
          value={value}
          onChange={handleChange}
          className={vertical ? classes.radioGroupVertical : classes.radioGroup}
        >
          {optionsArray.map(option => (
            <FormControlLabel
              key={option.id}
              label={option.label}
              value={option.value}
              control={<Radio color="primary" />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RadioInput;
