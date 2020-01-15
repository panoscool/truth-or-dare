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
  const [question, setQuestion] = useState(null);
  const [questType, setQuestType] = useState(null);

  const t = truth.map(t => {
    return {
      ...t,
      appeared: false
    };
  });

  const randomTruth = () => {
    playerTurn();

    const getTruthCategory = t.filter(t => t.category === category);
    console.log('getTruthCategory', getTruthCategory);

    const truthQuest = getTruthCategory.filter(t => !t.appeared);
    console.log('truthQuest', truthQuest);

    const randomNum = Math.floor(Math.random() * truthQuest.length);
    console.log('randomNum', randomNum);

    if (truthQuest) {
      setQuestion(truthQuest[randomNum].value);
      setQuestType('Truth');
      t[randomNum].appeared = true;
    }
  };

  const d = dare.map(d => {
    return {
      ...d,
      appeared: false
    };
  });

  const randomDare = () => {
    playerTurn();

    const getDareCategory = d.filter(d => d.category === category);
    console.log(getDareCategory);

    const dareQuest = getDareCategory.filter(d => !d.appeared);
    console.log(dareQuest);

    const randomNum = Math.floor(Math.random() * dareQuest.length);
    console.log(randomNum);

    if (dareQuest) {
      setQuestion(dareQuest[randomNum].value);
      setQuestType('Dare');
      d[randomNum].appeared = true;
    }
  };

  return (
    <div>
      {questType && questType}
      {question ? (
        <Typography gutterBottom>{question}</Typography>
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
