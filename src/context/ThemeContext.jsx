import React, { useState, createContext } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import { storeGetTheme } from '../config/store';

export const ThemeContext = createContext({
  setTheme: () => { },
  setModal: () => { }
});

export default ({ children }) => {
  const [modal, setModal] = useState(null);
  const [theme, setTheme] = useState(storeGetTheme() || 'dark');

  const muiTheme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: red,
      type: theme
    },
    typography: {
      fontFamily: 'Helvetica Neue, Roboto, sans-serif'
    }
  });

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        setTheme: setTheme,
        modal: modal,
        setModal: setModal
      }}
    >
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
