import React, { useState, createContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { storeSetItem, storeGetItem, KEYS } from '../config/store';

interface Props {
  children: ReactNode;
}

export const OptionsContext = createContext({
  players: [],
  category: null,
  playerName: null,
  setPlayers: (e: any) => { },
  setCategory: (e: any) => { },
  nextPlayer: (e: any) => { },
  scoreUpdate: (e: any) => { }
});

export default ({ children }: Props) => {
  const { pathname } = useLocation();
  const [playerIndex, setPlayerIndex] = useState(storeGetItem(KEYS.PLAYER_TURN) || 0);
  const [players, setPlayers] = useState(storeGetItem(KEYS.PLAYERS_LIST) || []);
  const [category, setCategory] = useState(storeGetItem(KEYS.QUESTION_CATEGORY) || 'funny');

  function scoreUpdate(qType: string) {
    const newPlayers = players.map((p: any, idx: string) => {
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

  return (
    <OptionsContext.Provider
      value={{
        players: players,
        category: category,
        playerName: currentPlayer,
        setPlayers: setPlayers,
        setCategory: setCategory,
        nextPlayer: nextPlayer,
        scoreUpdate: scoreUpdate
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};
