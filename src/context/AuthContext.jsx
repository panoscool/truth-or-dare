import React, { useState, createContext } from 'react';

export const AuthContext = createContext({
  setUser: () => { },
  setAdmin: () => { }
});

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  const { uid, displayName, photoURL } = user || {};

  const authenticated = user !== null;

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
        setAdmin: setAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
