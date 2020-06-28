import React, { useState, createContext, ReactNode } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import { storeGetTheme } from '../config/store';

interface Props {
  children: ReactNode;
}

export const ThemeContext = createContext({
  modal: null,
  theme: 'dark',
  setTheme: (e: string) => { },
  setModal: (e: any) => { }
});

export default ({ children }: Props) => {
  const [modal, setModal] = useState<any>(null);
  const [theme, setTheme] = useState<any>(storeGetTheme() || 'dark');

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
