import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { truth, dare } from '../questions';
import ShowQuest from './ShowQuest';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2)
  }
}));

function GamePage({ players, category }) {
  const classes = useStyles();
  const [state, setState] = useState({
    currentPlayer: 0,
    currentQuest: null,
    currentType: null
  });

  const { currentPlayer } = state;
  console.log(currentPlayer);

  const playerTurn = () => {
    let index = state.currentPlayer;

    if (players.length > 0) {
      setState({ currentPlayer: index++ });
    } else {
      setState({ currentPlayer: 0 });
    }
  };

  const randomTruth = () => {
    playerTurn();

    const getTruthCategory = truth.filter(t => t.category === category);

    const truthQuest = getTruthCategory.filter(t => !t.appeared);

    const randomNum = Math.floor(Math.random() * truthQuest.length);

    setState({
      currentQuest: truthQuest[randomNum],
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
      currentQuest: dareQuest[randomNum],
      currentType: 'Dare'
    });
    dare[randomNum].appeared = true;
  };

  return (
    <div>
      <ShowQuest
        currentQuest={state.currentQuest}
        currentType={state.currentType}
        currentPlayer={players[state.currentPlayer]}
      />

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
