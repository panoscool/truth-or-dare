import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Spinner from './Shared/Spinner';
import axios from './apiConfig';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing(2)
  },
  category: {
    marginBottom: theme.spacing(2)
  },
  question: {
    marginBottom: theme.spacing(2)
  }
}));

function GamePage({ category, playerTurn }) {
  const classes = useStyles();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionType, setQuestionType] = useState(null);
  const [truth, setTruth] = useState([]);
  const [dare, setDare] = useState([]);
  const [state, setState] = useState({
    loading: true,
    error: null
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const t = await axios.get('/truth');
        const d = await axios.get('/dare');

        setTruth(t.data);
        setDare(d.data);
        setState({ loading: false });
      } catch (err) {
        setState({
          loading: false,
          error: err
        });
      }
    };

    fetchData();

  }, [setTruth, setDare, setState]);

  function handleRandomTruth() {
    playerTurn();

    const getTruthCategory = truth.filter(t => t.category === category);
    const remainingTruth = getTruthCategory.filter(t => !t.appeared);
    const randomNum = Math.floor(Math.random() * remainingTruth.length);

    if (remainingTruth.length > 0) {
      setCurrentQuestion(remainingTruth[randomNum].question);
      setQuestionType('Truth');
      remainingTruth[randomNum].appeared = true;
    }
  };

  function handleRandomDare() {
    playerTurn();

    const getDareCategory = dare.filter(d => d.category === category);
    const remainingDare = getDareCategory.filter(d => !d.appeared);
    const randomNum = Math.floor(Math.random() * remainingDare.length);

    if (remainingDare.length > 0) {
      setCurrentQuestion(remainingDare[randomNum].question);
      setQuestionType('Dare');
      remainingDare[randomNum].appeared = true;
    }
  };

  return (
    <div className={classes.root}>
      {state.loading ? <Spinner /> : <>
        {questionType && <Typography className={classes.category}>{questionType}</Typography>}
        {currentQuestion ? (
          <Typography variant='h6' className={classes.question}>{currentQuestion}</Typography>
        ) : (
            <Typography gutterBottom>Select a question!</Typography>
          )}</>}

      <Button
        size="large"
        color="primary"
        variant="contained"
        className={classes.button}
        onClick={handleRandomTruth}
      >
        Truth
      </Button>
      <Button
        size="large"
        color="secondary"
        variant="contained"
        className={classes.button}
        onClick={handleRandomDare}
      >
        Dare
      </Button>
    </div>
  );
}

export default GamePage;
