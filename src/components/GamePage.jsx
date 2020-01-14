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
  const [state, setState] = useState({
    currentQuest: null,
    currentType: null
  });

  const randomTruth = () => {
    playerTurn();

    const getTruthCategory = truth.filter(t => t.category === category);

    const truthQuest = getTruthCategory.filter(t => !t.appeared);

    const randomNum = Math.floor(Math.random() * truthQuest.length);

    setState({
      currentQuest: truthQuest[randomNum].value,
      currentType: 'Truth'
    });
    truth[randomNum].appeared = true;
  };

  const randomDare = () => {
    playerTurn();

    const getDareCategory = dare.filter(d => d.category === category);

    const dareQuest = getDareCategory.filter(d => !d.appeared);

    const randomNum = Math.floor(Math.random() * dareQuest.length);

    setState({
      currentQuest: dareQuest[randomNum].value,
      currentType: 'Dare'
    });
    dare[randomNum].appeared = true;
  };

  return (
    <div>
      {state.currentQuest && state.currentQuest !== undefined ? (
        <Typography gutterBottom>{state.currentQuest}</Typography>
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
