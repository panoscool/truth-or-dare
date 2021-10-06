import React, { useState, createContext } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import { storeGetTheme } from '../config/store';

const initValues = {
  modal: null,
  theme: 'dark',
  setTheme: (e) => {},
  setModal: (e) => {},
};

export const ThemeContext = createContext(initValues);

export default ({ children }) => {
  const [modal, setModal] = useState(null);
  const [theme, setTheme] = useState(storeGetTheme() || 'dark');

  const muiTheme = createTheme({
    palette: {
      primary: blue,
      secondary: red,
      type: theme,
    },
    typography: {
      fontFamily: 'Helvetica Neue, Roboto, sans-serif',
    },
  });

  const values = {
    theme,
    setTheme,
    modal,
    setModal,
  };

  return (
    <ThemeContext.Provider value={values}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
