import React, { useState, createContext } from 'react';

export const OptionsContext = createContext({
  setData: () => { }
});

export default ({ children }) => {
  const [data, setData] = useState();

  return (
    <OptionsContext.Provider
      value={{
        data: data,
        setData: setData,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};
