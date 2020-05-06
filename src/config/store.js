const LOCAL = localStorage;
const SESSION = sessionStorage;

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

export const CLEAR_KEYS = Object.values(KEYS).slice(1);

export const storeGetTheme = () => LOCAL.getItem(KEYS.TORD_THEME);

export const storeSetTheme = (themeMode) => LOCAL.setItem(KEYS.TORD_THEME, themeMode);

export const storeSetItem = (key, data) => SESSION.setItem(key, JSON.stringify(data));

export const storeGetItem = (key) => JSON.parse(SESSION.getItem(key));

export const storeRemoveItem = (key) => SESSION.removeItem(key);

export const storeClearAll = (clearKeys) => clearKeys.forEach((key) => SESSION.removeItem(key));
