import React, { useState, createContext } from 'react';

export const AuthContext = createContext({
  setUserId: () => { },
  setDisplayName: () => { },
  setPhotoURL: () => { },
  setAdmin: () => { },
  setAuthenticated: () => { }
});

export default ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [userId, setUserId] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        authenticated: authenticated,
        setAuthenticated: setAuthenticated,
        admin: admin,
        setAdmin: setAdmin,
        userId: userId,
        setUserId: setUserId,
        displayName: displayName,
        setDisplayName: setDisplayName,
        photoURL: photoURL,
        setPhotoURL: setPhotoURL
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
