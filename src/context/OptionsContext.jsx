import React, { useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';

export const OptionsContext = createContext({
  setPlayers: () => { },
  setCategory: () => { },
  playerTurn: () => { },
});

export default ({ children }) => {
  const { pathname } = useLocation();
  const [playerIndex, setPlayerIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const [category, setCategory] = useState('funny');

  function scoreUpdate(qType) {
    const newPlayers = players.map((p, idx) => {
      if (idx === playerIndex) {
        p.score[qType] = p.score[qType] + 1;
      }
      return p;
    });
    setPlayers(newPlayers);
    nextPlayer();
  }

  function nextPlayer() {
    if (players.length && players.length !== playerIndex + 1) {
      setPlayerIndex(playerIndex + 1);
    } else {
      setPlayerIndex(0);
    }
  }

  const currentPlayer =
    pathname === '/game' && players.length && players[playerIndex].name;

  return (
    <OptionsContext.Provider
      value={{
        playerName: currentPlayer,
        players: players,
        setPlayers: setPlayers,
        category: category,
        setCategory: setCategory,
        playerTurn: scoreUpdate
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};
