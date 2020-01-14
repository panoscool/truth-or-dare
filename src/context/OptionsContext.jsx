import React, { useState, createContext } from "react";

export const OptionsContext = createContext({
  setPlayers: () => {},
  setCategory: () => {},
  setGuest: () => {}
});

export default ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [category, setCategory] = useState("funny");
  const [guest, setGuest] = useState(true);

  return (
    <OptionsContext.Provider
      value={{
        players: players,
        setPlayers: setPlayers,
        category: category,
        setCategory: setCategory,
        guest: guest,
        setGuest: setGuest
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};
