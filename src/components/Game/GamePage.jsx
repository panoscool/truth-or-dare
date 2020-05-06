import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import { OptionsContext } from '../../context/OptionsContext';
import GameDisplay from './GameDisplay';
import PlayersScore from '../Players/PlayersScore';
import { storeSetItem, storeGetItem, storeRemoveItem, KEYS } from '../../config/store';
import firebase from '../../config/firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center'
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(2)
  }
}));

function GamePage() {
  const classes = useStyles();
  const { category, playerName, nextPlayer, scoreUpdate } = useContext(OptionsContext);
  const [isTruthOver, setTruthOver] = useState(false);
  const [isDareOver, setDareOver] = useState(false);
  const [questionType, setQuestionType] = useState(storeGetItem(KEYS.QUESTION_TYPE) || null);
  const [currentQuestion, setCurrentQuestion] = useState(storeGetItem(KEYS.CURRENT_QUESTION) || null);
  const [truth, setTruth] = useState(storeGetItem(KEYS.TRUTH_QUESTIONS) || []);
  const [dare, setDare] = useState(storeGetItem(KEYS.DARE_QUESTIONS) || []);
  const [state, setState] = useState({
    loading: false,
    error: null
  });

  useEffect(() => {
    async function fetchData() {
      setState({ loading: true, error: null });

      try {
        const t = await firebase.firestore().collection('truth_questions').get();
        const d = await firebase.firestore().collection('dare_questions').get();

        setTruth(t.docs.map(doc => doc.data()).filter(t => t.category === category));
        setDare(d.docs.map(doc => doc.data()).filter(d => d.category === category));

        setState({ loading: false, error: null });
      } catch (err) {
        console.error(err.message);
        setState({ loading: false, error: err.message });
      }
    }

    if (truth.length <= 0 || dare.length <= 0) {
      fetchData();
    }
  }, [category, truth, dare]);

  function handlePlayerTurn(update) {
    if (update === 'update') {
      scoreUpdate(questionType);
    } else {
      nextPlayer();
    }
    setQuestionType(null);
    setCurrentQuestion(null);
    storeRemoveItem(KEYS.QUESTION_TYPE);
    storeRemoveItem(KEYS.CURRENT_QUESTION);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max.length);
  }

  function handleRandomTruth() {
    const remainingTruth = truth.filter(t => !t.appeared);
    const randomNum = getRandomInt(remainingTruth);

    if (remainingTruth.length > 0) {
      const question = remainingTruth[randomNum].question;

      setQuestionType('truth');
      storeSetItem(KEYS.QUESTION_TYPE, 'truth');
      setCurrentQuestion(question);
      storeSetItem(KEYS.CURRENT_QUESTION, question);
      remainingTruth[randomNum].appeared = true;
      storeSetItem(KEYS.TRUTH_QUESTIONS, truth);
    } else {
      setTruthOver(true);
    }
  }

  function handleRandomDare() {
    const remainingDare = dare.filter(d => !d.appeared);
    const randomNum = getRandomInt(remainingDare);

    if (remainingDare.length > 0) {
      const question = remainingDare[randomNum].question;

      setQuestionType('dare');
      storeSetItem(KEYS.QUESTION_TYPE, 'dare');
      setCurrentQuestion(question);
      storeSetItem(KEYS.CURRENT_QUESTION, question);
      remainingDare[randomNum].appeared = true;
      storeSetItem(KEYS.DARE_QUESTIONS, dare);
    } else {
      setDareOver(true);
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <GameDisplay
          state={state}
          isTruthOver={isTruthOver}
          isDareOver={isDareOver}
          questionType={questionType}
          currentQuestion={currentQuestion}
          playerName={playerName}
        />

        {currentQuestion && playerName ? (
          <>
            <Button
              size="large"
              color="secondary"
              variant="outlined"
              onClick={handlePlayerTurn}
              className={classes.button}
            >
              Skip
            </Button>
            <Button
              size="large"
              color="primary"
              variant="outlined"
              className={classes.button}
              onClick={() => handlePlayerTurn('update')}
            >
              Done
            </Button>
          </>
        ) : (
            <>
              <Button
                size="large"
                color="primary"
                variant="contained"
                disabled={isTruthOver}
                className={classes.button}
                onClick={handleRandomTruth}
              >
                Truth
              </Button>
              <Button
                size="large"
                color="secondary"
                variant="contained"
                disabled={isDareOver}
                className={classes.button}
                onClick={handleRandomDare}
              >
                Dare
              </Button>
            </>
          )}
      </Paper>
      {playerName ? <PlayersScore /> : null}
    </div>
  );
}

export default GamePage;
