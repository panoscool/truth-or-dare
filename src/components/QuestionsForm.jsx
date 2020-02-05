import React, { useState } from 'react';
import cuid from 'cuid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextInput from './Shared/TextInput';
import RadioInput from './Shared/RadioInput';
import { Button, Paper } from '@material-ui/core';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Spinner from './Shared/Spinner';
import firebase from '../config/firebase';

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
  },
  error: {
    color: 'red'
  }
}));

function QuestionsForm() {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  const [questionType, setQuestionType] = useState(null);
  const [values, setValues] = useState({
    category: '',
    question: ''
  });
  const [state, setState] = useState({
    loading: false,
    error: null
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

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setState({ loading: true });

      await firebase.firestore().collection(questionType).add(values);

      setState({ loading: false });
      setQuestionType(null);
      setValues({ category: '', question: '' });
    } catch (err) {
      console.error(err);
      setState({
        loading: false,
        error: err
      });
    }
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          Add your own questions!
        </Typography>
        <form onSubmit={handleSubmit}>
          <RadioInput
            required
            name="questionType"
            label="Question Type"
            value={questionType || ''}
            handleChange={handleQuestionType}
            optionsArray={[
              { id: cuid(), value: 'truth_questions', label: 'Truth' },
              { id: cuid(), value: 'dare_questions', label: 'Dare' }
            ]}
          />
          <RadioInput
            required
            name="category"
            label="Select Category"
            vertical={width < 460}
            value={values.category || ''}
            handleChange={handleChange}
            optionsArray={[
              { id: cuid(), value: 'funny', label: 'Funny' },
              { id: cuid(), value: 'challenging', label: 'Challenging' },
              { id: cuid(), value: 'uncensored', label: 'Uncensored' }
            ]}
          />
          <TextInput
            required
            name="question"
            label="Add question"
            placeholder="Add question"
            value={values.question || ''}
            handleChange={handleChange}
          />
          {state.loading ? (
            <Spinner />
          ) : (
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Save
            </Button>
            )}
        </form>
        <span className={classes.error}>{state.error && `${state.error.message} Please login or register.`}</span>
      </div>
    </Paper>
  );
}

export default QuestionsForm;
