import { useState, createContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import { storeGetTheme } from '../config/store';

export const ThemeContext = createContext({
  theme: 'dark',
  setTheme: (mode) => {},
});

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(storeGetTheme() || 'dark');

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: blue,
      secondary: red,
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
