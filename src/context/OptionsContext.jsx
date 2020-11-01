import React, { useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import { storeSetItem, storeGetItem, KEYS } from '../config/store';

const initValues = {
  players: [],
  category: null,
  currentPlayer: null,
  setPlayers: (e) => { },
  setCategory: (e) => { },
  nextPlayer: () => { },
  scoreUpdate: (e) => { }
};

export const OptionsContext = createContext(initValues);

function OptionsProvider({ children }) {
  const { pathname } = useLocation();
  const [playerIndex, setPlayerIndex] = useState(storeGetItem(KEYS.PLAYER_TURN) || 0);
  const [players, setPlayers] = useState(storeGetItem(KEYS.PLAYERS_LIST) || []);
  const [category, setCategory] = useState(storeGetItem(KEYS.QUESTION_CATEGORY) || 'funny');

  function scoreUpdate(qType) {
    const newPlayers = players.map((p, idx) => {
      if (idx === playerIndex) {
        p.score[qType] = p.score[qType] + 1;
      }
      return p;
    });
    setPlayers(newPlayers);
    storeSetItem(KEYS.PLAYERS_LIST, newPlayers);
    nextPlayer();
  }

  function nextPlayer() {
    if (players.length && players.length !== playerIndex + 1) {
      setPlayerIndex(playerIndex + 1);
      storeSetItem(KEYS.PLAYER_TURN, playerIndex + 1);
    } else {
      setPlayerIndex(0);
      storeSetItem(KEYS.PLAYER_TURN, 0);
    }
  }

  const currentPlayer = pathname === '/game' && players.length && players[playerIndex].name;

  const values = {
    players,
    category,
    currentPlayer,
    setPlayers,
    setCategory,
    nextPlayer,
    scoreUpdate
  };

  return (
    <OptionsContext.Provider value={values}>
      {children}
    </OptionsContext.Provider>
  );
};

export default OptionsProvider;