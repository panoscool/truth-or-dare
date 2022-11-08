import { Typography } from '@mui/material';
import Spinner from '../Shared/Spinner';

interface Props {
  state: any;
  isTruthOver: boolean;
  isDareOver: boolean;
  questionType: string;
  currentQuestion: string;
  currentPlayer: string | null;
}

function GameDisplay({
  state,
  isTruthOver,
  isDareOver,
  questionType,
  currentQuestion,
  currentPlayer,
}: Props) {
  if (state.loading) {
    return <Spinner thickness={2} />;
  } else if (isTruthOver && isDareOver) {
    return <Typography variant="h4">Game over</Typography>;
  } else if (questionType && currentQuestion) {
    return (
      <>
        <Typography variant="caption" color="textSecondary" textTransform="capitalize">
          {questionType}
        </Typography>
        <Typography variant="h6" my={2}>
          {currentQuestion}
        </Typography>
      </>
    );
  } else if (state.error) {
    return (
      <Typography gutterBottom color="error">
        {state.error}
      </Typography>
    );
  } else {
    return (
      <Typography gutterBottom variant="h6" textTransform="capitalize">
        {currentPlayer ? <span>{currentPlayer} is playing...</span> : 'Select a question type!'}
      </Typography>
    );
  }
}

export default GameDisplay;
