import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import GameDisplay from './GameDisplay';
import useGameOptions from '../../hooks/useGameOptions';
import PlayersScore from '../Players/PlayersScore';
import { storeSetItem, storeGetItem, storeRemoveItem, KEYS } from '../../config/store';
import { firestore } from '../../config/firebase';

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
  },
  text: {
    minHeight: 100
  }
}));

function GamePage() {
  const classes = useStyles();
  const [isTruthOver, setTruthOver] = useState(false);
  const [isDareOver, setDareOver] = useState(false);
  const { category, currentPlayer, nextPlayer, scoreUpdate } = useGameOptions();
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
        const t = await firestore.collection('truth_questions').get();
        const d = await firestore.collection('dare_questions').get();

        setTruth(t.docs.map((doc) => doc.data()).filter((t) => t.category === category));
        setDare(d.docs.map((doc) => doc.data()).filter((d) => d.category === category));

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

  function handlePlayerTurn(update?: string) {
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

  function handleStorage(type: string, question: string) {
    storeSetItem(KEYS.QUESTION_TYPE, type);
    storeSetItem(KEYS.CURRENT_QUESTION, question);
    if (type === 'truth') {
      storeSetItem(KEYS.TRUTH_QUESTIONS, truth);
    } else {
      storeSetItem(KEYS.DARE_QUESTIONS, dare);
    }
  }

  function getRandomInt(max: string) {
    return Math.floor(Math.random() * max.length);
  }

  function getFilteredQuestions(type: string) {
    if (type === 'truth') {
      return truth.filter((t: any) => !t.appeared);
    } else {
      return dare.filter((t: any) => !t.appeared);
    }
  }

  function handleRandomQuestion(qType: string) {
    const remainedQuestions = getFilteredQuestions(qType);
    const randomNum = getRandomInt(remainedQuestions);

    if (remainedQuestions.length > 0) {
      const question = remainedQuestions[randomNum].question;

      setQuestionType(qType);
      setCurrentQuestion(question);
      remainedQuestions[randomNum].appeared = true;
      handleStorage(qType, question);
    } else {
      qType === 'truth' ? setTruthOver(true) : setDareOver(true);
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.text}>
          <GameDisplay
            state={state}
            isTruthOver={isTruthOver}
            isDareOver={isDareOver}
            questionType={questionType}
            currentQuestion={currentQuestion}
            currentPlayer={currentPlayer}
          />
        </div>
        <div className="animate-btnGroup">
          {currentQuestion && currentPlayer ? (
            <>
              <Button
                size="large"
                color="secondary"
                variant="outlined"
                onClick={() => handlePlayerTurn()}
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
                  className={classes.button}
                  disabled={isTruthOver || state.loading}
                  onClick={() => handleRandomQuestion('truth')}
                >
                  Truth
              </Button>
                <Button
                  size="large"
                  color="secondary"
                  variant="contained"
                  className={classes.button}
                  disabled={isDareOver || state.loading}
                  onClick={() => handleRandomQuestion('dare')}
                >
                  Dare
              </Button>
              </>
            )}
        </div>
      </Paper>
      {currentPlayer ? <PlayersScore /> : null}
    </div>
  );
}

export default GamePage;
