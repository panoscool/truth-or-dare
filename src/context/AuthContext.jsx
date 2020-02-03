import React, { useState, createContext } from 'react';

export const AuthContext = createContext({
  setModal: () => { },
  setAuthenticated: () => { }
});

export default ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [modal, setModal] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        authenticated: authenticated,
        setAuthenticated: setAuthenticated,
        modal: modal,
        setModal: setModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
