import React, { useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';

export const OptionsContext = createContext({
  setPlayers: () => {},
  setCategory: () => {},
  playerTurn: () => {},
  setGameOn: () => {}
});

export default ({ children }) => {
  const { pathname } = useLocation();
  const [gameOn, setGameOn] = useState(false);
  const [player, setPlayer] = useState(0);
  const [players, setPlayers] = useState([]);
  const [category, setCategory] = useState('funny');

  function playerTurn() {
    if (players.length && players.length !== player + 1) {
      setPlayer(player + 1);
    } else {
      setPlayer(0);
    }
  }

  const currentPlayer =
    pathname === '/game' && players.length && players[player].name;

  return (
    <OptionsContext.Provider
      value={{
        playerName: currentPlayer,
        gameOn: gameOn,
        setGameOn: setGameOn,
        players: players,
        setPlayers: setPlayers,
        category: category,
        setCategory: setCategory,
        playerTurn: playerTurn
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};
