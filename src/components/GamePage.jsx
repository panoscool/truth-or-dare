import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { truth, dare } from './questions';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2)
  }
}));

function GamePage({ category, playerTurn }) {
  const classes = useStyles();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionType, setQuestionType] = useState(null);

  const randomTruth = () => {
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

  const randomDare = () => {
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
    <div>
      {questionType && questionType}
      {currentQuestion ? (
        <Typography gutterBottom>{currentQuestion}</Typography>
      ) : (
          <Typography gutterBottom>Select a question!</Typography>
        )}

      <Button
        size="large"
        color="primary"
        variant="contained"
        className={classes.button}
        onClick={randomTruth}
      >
        Truth
      </Button>
      <Button
        size="large"
        color="secondary"
        variant="contained"
        className={classes.button}
        onClick={randomDare}
      >
        Dare
      </Button>
    </div>
  );
}

export default GamePage;
