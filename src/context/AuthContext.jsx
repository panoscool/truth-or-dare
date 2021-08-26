import React, { useState, createContext, useEffect } from 'react';
import firebase, { auth } from '../config/firebase';

const initValues = {
  loading: true,
  user: null,
  admin: null,
  uid: null,
  displayName: null,
  photoURL: null,
  authenticated: null,
  signup: (email, password) => {},
  signin: (email, password) => {},
  signout: () => {},
  socialLogin: (provider) => {},
  resetPassword: (email) => {},
};

export const AuthContext = createContext(initValues);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          setAdmin(idTokenResult.claims.admin);
        });
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setAdmin(false);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function socialLogin(selectedProvider) {
    const provider = {
      google: new firebase.auth.GoogleAuthProvider(),
      twitter: new firebase.auth.TwitterAuthProvider(),
    };
    return auth.signInWithPopup(provider[selectedProvider]);
  }

  const { uid, displayName, photoURL } = user || {};
  const authenticated = user !== null;

  const contextValues = {
    user,
    admin,
    uid,
    displayName,
    photoURL,
    authenticated,
    loading,
  };

  const contextFunctions = {
    signup,
    signin,
    signout,
    socialLogin,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={{ ...contextValues, ...contextFunctions }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
