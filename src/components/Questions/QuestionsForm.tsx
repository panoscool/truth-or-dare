import { useState, useEffect } from 'react';
import cuid from 'cuid';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, TextField } from '@mui/material';
import RadioInput from '../Shared/RadioInput';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Spinner from '../Shared/Spinner';
import firebase, { firestore } from '../../config/firebase';
import useAuthentication from '../../hooks/useAuthentication';
import Layout from '../Layout';
import { styled } from '@mui/material/styles';

const FormElementGap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
}));

function QuestionsForm() {
  const navigate = useNavigate();
  const { id, type } = useParams<{ id: string; type: string }>();
  const { width } = useWindowDimensions();
  const { uid, authenticated } = useAuthentication();
  const [questionType, setQuestionType] = useState('');
  const [values, setValues] = useState({
    category: '',
    question: '',
  });
  const [state, setState] = useState({
    loading: false,
    error: '',
  });

  useEffect(() => {
    async function fetchQuestion() {
      if (!id) return;

      setState({ loading: true, error: '' });
      try {
        const doc = await firestore.collection(type!).doc(id).get();

        setState({ loading: false, error: '' });
        if (doc.exists) {
          const d = doc.data();
          setQuestionType(type!);
          setValues({ category: d?.category, question: d?.question });
        } else {
          // doc.data() will be undefined in this case
          setState({ loading: false, error: 'No such document!' });
        }
      } catch (err) {
        console.error('Error getting document:', err);
        setState({ loading: false, error: (err as any).message });
      }
    }

    fetchQuestion();
  }, [id, type]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleQuestionType(event: { target: { value: React.SetStateAction<string> } }) {
    setQuestionType(event.target.value);
  }

  async function handleQuestionCreate() {
    try {
      setState({ loading: true, error: '' });

      const newQuestion = {
        ...values,
        userId: uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await firestore.collection(questionType).add(newQuestion);

      setState({ loading: false, error: '' });
      setQuestionType('');
      setValues({ category: '', question: '' });
    } catch (err) {
      console.error((err as any).message);
      setState({ loading: false, error: (err as any).message });
    }
  }

  async function handleQuestionUpdate() {
    try {
      setState({ loading: true, error: '' });

      const updatedQuestion = {
        ...values,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await firestore.collection(type!).doc(id).update(updatedQuestion);

      setState({ loading: false, error: '' });
      navigate('/questions');
    } catch (err) {
      console.error((err as any).message);
      setState({ loading: false, error: (err as any).message });
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
    <Layout>
      <Typography variant="h6" textAlign="center" py={2}>
        Add your own questions!
      </Typography>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <FormElementGap>
          <RadioInput
            required
            row
            name="questionType"
            label="Question Type"
            disabled={Boolean(id)}
            value={questionType || ''}
            onChange={handleQuestionType}
            options={[
              { id: cuid(), value: 'truth_questions', label: 'Truth' },
              { id: cuid(), value: 'dare_questions', label: 'Dare' },
            ]}
          />
        </FormElementGap>
        <FormElementGap>
          <RadioInput
            required
            name="category"
            label="Select Category"
            row={width > 460}
            value={values.category || ''}
            onChange={handleChange}
            options={[
              { id: cuid(), value: 'funny', label: 'Funny' },
              { id: cuid(), value: 'challenging', label: 'Challenging' },
              { id: cuid(), value: 'uncensored', label: 'Uncensored' },
            ]}
          />
        </FormElementGap>
        <FormElementGap>
          <TextField
            required
            name="question"
            label="Add question"
            placeholder="Add question"
            value={values.question || ''}
            onChange={handleChange}
          />
        </FormElementGap>

        <Box pb={4}>
          {state.loading ? (
            <Spinner thickness={2} />
          ) : (
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              disabled={!authenticated}
            >
              Save
            </Button>
          )}
        </Box>
      </form>

      <Typography gutterBottom color="error">
        {state.error && state.error}
      </Typography>

      {!authenticated && (
        <Box py={2} textAlign="center">
          <Typography variant="caption" color="textSecondary">
            * Login to submit your questions *
          </Typography>
        </Box>
      )}
    </Layout>
  );
}

export default QuestionsForm;
