import { Typography, Box, IconButton } from '@mui/material';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import Loading from '../Shared/Loading';
import { navigatorShare } from '../../utils/navigator-share';

interface Props {
  state: any;
  isTruthOver: boolean;
  isDareOver: boolean;
  questionType: string;
  currentQuestion: string;
  currentPlayer: string | null;
}

function GameDisplay(props: Props) {
  const { state, isTruthOver, isDareOver, questionType, currentQuestion, currentPlayer } = props;

  const handleShare = async () => {
    await navigatorShare({ title: questionType, text: currentQuestion });
  };

  if (state.loading) {
    return <Loading />;
  }
  if (isTruthOver && isDareOver) {
    return (
      <Typography variant="h4" textAlign="center">
        Game over
      </Typography>
    );
  }
  if (questionType && currentQuestion) {
    return (
      <Box textAlign="center">
        <IconButton onClick={handleShare} sx={{ position: 'absolute', top: '1rem', right: 0 }}>
          <ShareRoundedIcon fontSize="small" />
        </IconButton>
        <Typography variant="caption" color="textSecondary" textTransform="capitalize">
          {questionType}
        </Typography>
        <Typography variant="h6" my={2}>
          {currentQuestion}
        </Typography>
      </Box>
    );
  }
  if (state.error) {
    return (
      <Typography gutterBottom color="error" textAlign="center">
        {state.error}
      </Typography>
    );
  }

  return (
    <Box textAlign="center">
      {currentPlayer ? (
        <Typography gutterBottom variant="h6">
          <Typography variant="h6" component="span" textTransform="capitalize">
            {currentPlayer}{' '}
          </Typography>
          is playing...
        </Typography>
      ) : (
        <Typography variant="h5">Select a question type!</Typography>
      )}
    </Box>
  );
}

export default GameDisplay;
