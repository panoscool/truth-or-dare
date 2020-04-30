import React, { useState, createContext } from 'react';

export const AuthContext = createContext({
  setUser: () => { },
  setAdmin: () => { },
  setAuthenticated: () => { }
});

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [authenticated, setAuthenticated] = useState(null);

  const { uid, displayName, photoURL } = user || {};

  return (
    <AuthContext.Provider
      value={{
        user: user,
        admin: admin,
        userId: uid,
        displayName: displayName,
        photoURL: photoURL,
        authenticated: authenticated,
        setUser: setUser,
        setAdmin: setAdmin,
        setAuthenticated: setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
