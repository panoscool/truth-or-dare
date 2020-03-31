import store from 'store';

export const KEYS = {
  TORD_THEME: 'tord_theme',
  PLAYER_TURN: 'player_turn',
  PLAYERS_LIST: 'players_list',
  QUESTION_TYPE: 'question_type',
  DARE_QUESTIONS: 'dare_questions',
  TRUTH_QUESTIONS: 'truth_questions',
  CURRENT_QUESTION: 'current_question',
  QUESTION_CATEGORY: 'question_category'
};

export const storeGetTheme = () => store.get(KEYS.TORD_THEME);
export const storeSetTheme = (themeMode) => store.set(KEYS.TORD_THEME, themeMode);

export const storeGetPlayerTurn = () => store.get(KEYS.PLAYER_TURN);
export const storeSetPlayerTurn = (playerTurn) => store.set(KEYS.PLAYER_TURN, playerTurn);
export const storeRemovePlayerTurn = () => store.remove(KEYS.PLAYER_TURN);

export const storeGetPlayers = () => store.get(KEYS.PLAYERS_LIST);
export const storeSetPlayers = (players) => store.set(KEYS.PLAYERS_LIST, players);
export const storeRemovePlayers = () => store.remove(KEYS.PLAYERS_LIST);

export const storeGetQuestionCategory = () => store.get(KEYS.QUESTION_CATEGORY);
export const storeSetQuestionCategory = (questionCategory) => store.set(KEYS.QUESTION_CATEGORY, questionCategory);
export const storeRemoveQuestionCategory = () => store.remove(KEYS.QUESTION_CATEGORY);

export const storeGetQuestionType = () => store.get(KEYS.QUESTION_TYPE);
export const storeSetQuestionType = (questionType) => store.set(KEYS.QUESTION_TYPE, questionType);
export const storeRemoveQuestionType = () => store.remove(KEYS.QUESTION_TYPE);

export const storeGetCurrentQuestion = () => store.get(KEYS.CURRENT_QUESTION);
export const storeSetCurrentQuestion = (currentQuestion) => store.set(KEYS.CURRENT_QUESTION, currentQuestion);
export const storeRemoveCurrentQuestion = () => store.remove(KEYS.CURRENT_QUESTION);

export const storeGetTruthQuestions = () => store.get(KEYS.TRUTH_QUESTIONS);
export const storeSetTruthQuestions = (questions) => store.set(KEYS.TRUTH_QUESTIONS, questions);
export const storeRemoveTruthQuestions = () => store.remove(KEYS.TRUTH_QUESTIONS);

export const storeGetDareQuestions = () => store.get(KEYS.DARE_QUESTIONS);
export const storeSetDareQuestions = (questions) => store.set(KEYS.DARE_QUESTIONS, questions);
export const storeRemoveDareQuestions = () => store.remove(KEYS.DARE_QUESTIONS);

export const storeClearAll = () => {
  storeRemovePlayerTurn();
  storeRemovePlayers();
  storeRemoveQuestionCategory();
  storeRemoveQuestionType();
  storeRemoveCurrentQuestion();
  storeRemoveTruthQuestions();
  storeRemoveDareQuestions();
};
