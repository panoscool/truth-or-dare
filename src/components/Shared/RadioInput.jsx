import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(1)
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'row'
    }
  }
}));

function RadioInput(props) {
  const classes = useStyles();

  const { name, value, optionsArray, handleChange } = props;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Game Mode</FormLabel>
        <RadioGroup
          aria-label="radio-group"
          name={name}
          value={value}
          onChange={handleChange}
          className={classes.radioGroup}
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
