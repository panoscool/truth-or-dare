import store from 'store';

export const KEYS = {
  TORD_THEME: 'tord_theme',
  PLAYER_TURN: 'player_turn',
  PLAYERS_LIST: 'players_list',
  QUESTION_TYPE: 'question_type',
  CURRENT_QUESTION: 'current_question',
  QUESTION_CATEGORY: 'question_category'
};

export const storeGetTheme = () => store.get(KEYS.TORD_THEME);
export const storeSetTheme = (themeMode) => store.set(KEYS.TORD_THEME, themeMode);

export const storeGetPlayerTurn = () => store.get(KEYS.PLAYER_TURN);
export const storeSetPlayerTurn = (playerTurn) => store.set(KEYS.PLAYER_TURN, playerTurn);

export const storeGetPlayers = () => store.get(KEYS.PLAYERS_LIST);
export const storeSetPlayers = (players) => store.set(KEYS.PLAYERS_LIST, players);

export const storeGetQuestionCategory = () => store.get(KEYS.QUESTION_CATEGORY);
export const storeSetQuestionCategory = (questionCategory) => store.set(KEYS.QUESTION_CATEGORY, questionCategory);

export const storeGetQuestionType = () => store.get(KEYS.QUESTION_TYPE);
export const storeSetQuestionType = (questionType) => store.set(KEYS.QUESTION_TYPE, questionType);

export const storeGetCurrentQuestion = () => store.get(KEYS.CURRENT_QUESTION);
export const storeSetCurrentQuestion = (currentQuestion) => store.set(KEYS.CURRENT_QUESTION, currentQuestion);
