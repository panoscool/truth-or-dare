import React, { useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import { storeGetQuestionCategory, storeGetPlayers, storeGetPlayerTurn, storeSetPlayers, storeSetPlayerTurn } from '../config/store';

export const OptionsContext = createContext({
  setPlayers: () => { },
  setCategory: () => { },
  nextPlayer: () => { },
  scoreUpdate: () => { }
});

export default ({ children }) => {
  const { pathname } = useLocation();
  const [playerIndex, setPlayerIndex] = useState(storeGetPlayerTurn() || 0);
  const [players, setPlayers] = useState(storeGetPlayers() || []);
  const [category, setCategory] = useState(storeGetQuestionCategory() || 'funny');

  function scoreUpdate(qType) {
    const newPlayers = players.map((p, idx) => {
      if (idx === playerIndex) {
        p.score[qType] = p.score[qType] + 1;
      }
      return p;
    });
    setPlayers(newPlayers);
    storeSetPlayers(newPlayers);
    nextPlayer();
  }

  function nextPlayer() {
    if (players.length && players.length !== playerIndex + 1) {
      setPlayerIndex(playerIndex + 1);
      storeSetPlayerTurn(playerIndex + 1);
    } else {
      setPlayerIndex(0);
      storeSetPlayerTurn(0);
    }
  }

  const currentPlayer = pathname === '/game' && players.length && players[playerIndex].name;

  return (
    <OptionsContext.Provider
      value={{
        playerName: currentPlayer,
        players: players,
        setPlayers: setPlayers,
        category: category,
        setCategory: setCategory,
        nextPlayer: nextPlayer,
        scoreUpdate: scoreUpdate
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};
