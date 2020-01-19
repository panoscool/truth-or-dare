import React, { useState } from 'react';
import cuid from 'cuid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextInput from './Shared/TextInput';
import RadioInput from './Shared/RadioInput';
import { Button, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: 620,
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing(2, 0)
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(2)
  }
}));

function QuestionsForm() {
  const classes = useStyles();
  const [questionType, setQuestionType] = useState(null);
  const [values, setValues] = useState({
    question: '',
    category: ''
  });

  function handleQuestionType(event) {
    setQuestionType(event.target.value);
  }

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          Add your own questions!
        </Typography>
        <form onSubmit={handleSubmit}>
          <RadioInput
            name="questionType"
            label="Question Type"
            value={questionType || ''}
            handleChange={handleQuestionType}
            optionsArray={[
              { id: cuid(), value: 'truth', label: 'Truth' },
              { id: cuid(), value: 'dare', label: 'Dare' }
            ]}
          />
          <RadioInput
            name="category"
            label="Select Category"
            value={values.category || ''}
            handleChange={handleChange}
            optionsArray={[
              { id: cuid(), value: 'funny', label: 'Funny' },
              { id: cuid(), value: 'challenging', label: 'Challenging' },
              { id: cuid(), value: 'uncensored', label: 'Uncensored' }
            ]}
          />
          <TextInput
            name="question"
            label="Add question"
            placeholder="Add question"
            value={values.question || ''}
            handleChange={handleChange}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Save
          </Button>
        </form>
      </div>
    </Paper>
  );
}

export default QuestionsForm;
