import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Spinner from '../Shared/Spinner';

const useStyles = makeStyles((theme) => ({
  pName: {
    textTransform: 'capitalize'
  },
  qType: {
    textTransform: 'uppercase'
  },
  question: {
    margin: theme.spacing(2, 0)
  }
}));

interface Props {
  state: any;
  isTruthOver: boolean;
  isDareOver: boolean;
  questionType: string;
  currentQuestion: string;
  currentPlayer: string | null;
}

function GameDisplay({ state, isTruthOver, isDareOver, questionType, currentQuestion, currentPlayer }: Props) {
  const classes = useStyles();

  const playerName = <span className={classes.pName}>{currentPlayer}</span>;

  if (state.loading) {
    return <Spinner thickness={2} />;
  } else if (isTruthOver && isDareOver) {
    return <Typography variant="h4">Game over</Typography>;
  } else if (questionType && currentQuestion) {
    return (
      <>
        <Typography variant="caption" color="textSecondary" className={classes.qType}>
          {questionType}
        </Typography>
        <Typography variant="h6" className={classes.question}>
          {currentQuestion}
        </Typography>
      </>
    );
  } else if (state.error) {
    return <Typography gutterBottom color="error">{state.error}</Typography>;
  } else {
    return (
      <Typography gutterBottom variant="h6">
        {currentPlayer
          ? <span>{playerName} is playing...</span>
          : 'Select a question type!'}
      </Typography>
    );
  }
}

export default GameDisplay;
