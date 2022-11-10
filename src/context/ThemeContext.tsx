import { useState, createContext, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { blue, red } from '@mui/material/colors';
import { storeGetTheme, storeSetTheme } from '../config/store';
import { PaletteMode } from '@mui/material';

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const themeMode = storeGetTheme() || (prefersDarkMode ? 'dark' : 'light');
  const [theme, setTheme] = useState<PaletteMode>(themeMode as PaletteMode);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          primary: blue,
          secondary: red,
        },
        typography: {
          fontFamily: 'Roboto, sans-serif',
        },
        components: {
          MuiTextField: {
            defaultProps: {
              fullWidth: true,
              size: 'small',
            },
          },
        },
      }),
    [theme],
  );

  function toggleTheme() {
    const mode = theme === 'light' ? 'dark' : 'light';

    setTheme(mode);
    storeSetTheme(mode);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
