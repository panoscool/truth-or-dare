import React, { useState, createContext } from 'react';

export const AuthContext = createContext({
  setModal: () => { },
  setUserId: () => { },
  setAuthenticated: () => { }
});

export default ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [userId, setUserId] = useState(null);
  const [modal, setModal] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        authenticated: authenticated,
        setAuthenticated: setAuthenticated,
        userId: userId,
        setUserId: setUserId,
        modal: modal,
        setModal: setModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
