import React, { useState, createContext } from 'react';

export const OptionsContext = createContext({
  setPlayers: () => { },
  setCategory: () => { }
});

export default ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [category, setCategory] = useState('funny');

  return (
    <OptionsContext.Provider
      value={{
        players: players,
        setPlayers: setPlayers,
        category: category,
        setCategory: setCategory
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};
