import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Spinner from './Shared/Spinner';
import firebase from '../config/firebase';
import { OptionsContext } from '../context/OptionsContext';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(2)
  },
  qType: {
    textTransform: 'capitalize'
  },
  question: {
    margin: theme.spacing(2, 0)
  }
}));

function GamePage() {
  const classes = useStyles();
  const { category, playerName, playerTurn } = useContext(
    OptionsContext
  );
  const [questionType, setQuestionType] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [truth, setTruth] = useState([]);
  const [dare, setDare] = useState([]);
  const [state, setState] = useState({
    loading: true,
    error: null
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const t = await firebase.firestore().collection('truth_questions').get();
        const d = await firebase.firestore().collection('dare_questions').get();

        setTruth(t.docs.map(doc => doc.data()).filter(t => t.category === category));
        setDare(d.docs.map(doc => doc.data()).filter(d => d.category === category));

        setState({ loading: false });
      } catch (err) {
        setState({
          loading: false,
          error: err
        });
      }
    }

    fetchData();
  }, [category, setTruth, setDare, setState]);

  function handlePlayerTurn() {
    playerTurn(questionType);
    setQuestionType(null);
    setCurrentQuestion(null);
  }

  function handleRandomTruth() {
    const remainingTruth = truth.filter(t => !t.appeared);
    const randomNum = Math.floor(Math.random() * remainingTruth.length);

    if (remainingTruth.length > 0) {
      setCurrentQuestion(remainingTruth[randomNum].question);
      setQuestionType('truth');
      remainingTruth[randomNum].appeared = true;
    }
  }

  function handleRandomDare() {
    const remainingDare = dare.filter(d => !d.appeared);
    const randomNum = Math.floor(Math.random() * remainingDare.length);

    if (remainingDare.length > 0) {
      setCurrentQuestion(remainingDare[randomNum].question);
      setQuestionType('dare');
      remainingDare[randomNum].appeared = true;
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {state.loading ? (
          <Spinner />
        ) : (
            <>
              {questionType && (
                <Typography className={classes.qType}>
                  {questionType}
                </Typography>
              )}
              {currentQuestion ? (
                <Typography variant="h6" className={classes.question}>
                  {currentQuestion}
                </Typography>
              ) : (
                  <Typography gutterBottom>{playerName ? `${playerName} select a question type!` : "Select a question type!"}</Typography>
                )}
            </>
          )}

        {currentQuestion && playerName ?
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={handlePlayerTurn}>
            Next player
          </Button>
          : <>
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
          </>}
      </Paper>
    </div>
  );
}

export default GamePage;
