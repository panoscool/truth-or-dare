import React, { useState, createContext } from 'react';

export const AuthContext = createContext({
  setModal: () => { },
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
  const [modal, setModal] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        authenticated: authenticated,
        setAuthenticated: setAuthenticated,
        admin: admin,
        setAdmin: setAdmin,
        userId: userId,
        displayName: displayName,
        photoURL: photoURL,
        setUserId: setUserId,
        setDisplayName: setDisplayName,
        setPhotoURL: setPhotoURL,
        modal: modal,
        setModal: setModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
