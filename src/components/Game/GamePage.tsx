import { useState, useEffect } from 'react';
import { Paper, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import GameDisplay from './GameDisplay';
import useGameOptions from '../../hooks/useGameOptions';
import PlayersScore from '../Players/PlayersScore';
import { storeSetItem, storeGetItem, storeRemoveItem, KEYS } from '../../config/store';
import { firestore } from '../../config/firebase';

const ButtonsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1),
  margin: theme.spacing(2, 0),
}));

function GamePage() {
  const [isTruthOver, setTruthOver] = useState(false);
  const [isDareOver, setDareOver] = useState(false);
  const { category, currentPlayer, nextPlayer, scoreUpdate } = useGameOptions();
  const [questionType, setQuestionType] = useState(storeGetItem(KEYS.QUESTION_TYPE) || null);
  const [currentQuestion, setCurrentQuestion] = useState(
    storeGetItem(KEYS.CURRENT_QUESTION) || null,
  );
  const [truth, setTruth] = useState(storeGetItem(KEYS.TRUTH_QUESTIONS) || []);
  const [dare, setDare] = useState(storeGetItem(KEYS.DARE_QUESTIONS) || []);
  const [state, setState] = useState({
    loading: false,
    error: null,
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
        console.error((err as any).message);
        setState({ loading: false, error: (err as any).message });
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
    <Box textAlign="center">
      <Paper sx={{ m: 2, p: 2 }}>
        <Box minHeight={100}>
          <GameDisplay
            state={state}
            isTruthOver={isTruthOver}
            isDareOver={isDareOver}
            questionType={questionType}
            currentQuestion={currentQuestion}
            currentPlayer={currentPlayer}
          />
        </Box>
        <div className="animate-btnGroup">
          {currentQuestion && currentPlayer ? (
            <ButtonsWrapper>
              <Button
                size="large"
                color="secondary"
                variant="outlined"
                onClick={() => handlePlayerTurn()}
              >
                Skip
              </Button>
              <Button
                size="large"
                color="primary"
                variant="outlined"
                onClick={() => handlePlayerTurn('update')}
              >
                Done
              </Button>
            </ButtonsWrapper>
          ) : (
            <ButtonsWrapper>
              <Button
                size="large"
                color="primary"
                variant="contained"
                disabled={isTruthOver || state.loading}
                onClick={() => handleRandomQuestion('truth')}
              >
                Truth
              </Button>
              <Button
                size="large"
                color="secondary"
                variant="contained"
                disabled={isDareOver || state.loading}
                onClick={() => handleRandomQuestion('dare')}
              >
                Dare
              </Button>
            </ButtonsWrapper>
          )}
        </div>
      </Paper>
      {currentPlayer ? <PlayersScore /> : null}
    </Box>
  );
}

export default GamePage;
