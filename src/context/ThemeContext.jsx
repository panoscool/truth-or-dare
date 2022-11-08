import { useState, createContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import { storeGetTheme } from '../config/store';

const initValues = {
  modal: null,
  theme: 'dark',
  setTheme: (e) => {},
  setModal: (e) => {},
};

export const ThemeContext = createContext(initValues);

function ThemeContextProvider({ children }) {
  const [modal, setModal] = useState(null);
  const [theme, setTheme] = useState(storeGetTheme() || 'dark');

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: blue,
      secondary: red,
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
}

export default ThemeContextProvider;
