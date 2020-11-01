// @ts-nocheck
import React, { useState, useEffect } from 'react';
import cuid from 'cuid';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Typography } from '@material-ui/core';
import TextInput from '../Shared/TextInput';
import RadioInput from '../Shared/RadioInput';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Spinner from '../Shared/Spinner';
import firebase, { firestore } from '../../config/firebase';
import useAuthentication from '../../hooks/useAuthentication';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  innerBlock: {
    width: 620,
    textAlign: 'center'
  },
  button: {
    marginBottom: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(2)
  }
}));

function QuestionsForm() {
  const classes = useStyles();
  const history = useHistory();
  const { id, type } = useParams();
  const { width } = useWindowDimensions();
  const { uid, authenticated } = useAuthentication();
  const [questionType, setQuestionType] = useState('');
  const [values, setValues] = useState({
    category: '',
    question: ''
  });
  const [state, setState] = useState({
    loading: false,
    error: ''
  });

  useEffect(() => {
    async function fetchQuestion() {
      if (!id) return;

      setState({ loading: true, error: '' });
      try {
        const doc = await firestore.collection(type).doc(id).get();

        setState({ loading: false, error: '' });
        if (doc.exists) {
          const d = doc.data();
          setQuestionType(type);
          setValues({ category: d?.category, question: d?.question });
        } else {
          // doc.data() will be undefined in this case
          setState({ loading: false, error: 'No such document!' });
        }
      } catch (err) {
        console.error('Error getting document:', err);
        setState({ loading: false, error: err.message });
      }
    }

    fetchQuestion();
  }, [id, type]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleQuestionType(event: { target: { value: React.SetStateAction<string>; }; }) {
    setQuestionType(event.target.value);
  }

  async function handleQuestionCreate() {
    try {
      setState({ loading: true, error: '' });

      const newQuestion = {
        ...values,
        userId: uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      await firestore.collection(questionType).add(newQuestion);

      setState({ loading: false, error: '' });
      setQuestionType('');
      setValues({ category: '', question: '' });
    } catch (err) {
      console.error(err.message);
      setState({ loading: false, error: err.message });
    }
  }

  async function handleQuestionUpdate() {
    try {
      setState({ loading: true, error: '' });

      const updatedQuestion = {
        ...values,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      await firestore.collection(type).doc(id).update(updatedQuestion);

      setState({ loading: false, error: '' });
      history.push('/questions');
    } catch (err) {
      console.error(err.message);
      setState({ loading: false, error: err.message });
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!id) {
      handleQuestionCreate();
    } else {
      handleQuestionUpdate();
    }
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.innerBlock}>
        <Typography variant="h6" className={classes.title}>Add your own questions!</Typography>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <RadioInput
            required
            name="questionType"
            label="Question Type"
            disabled={Boolean(id)}
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
            <Spinner thickness={2} />
          ) : (
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                disabled={!authenticated}
                className={classes.button}
              >
                Save
              </Button>
            )}
        </form>
        <Typography gutterBottom color='error'>{state.error && state.error}</Typography>
        {!authenticated &&
          <Typography variant='caption' color='textSecondary'>* Login to submit your questions *</Typography>}
      </div>
    </Paper>
  );
}

export default QuestionsForm;
