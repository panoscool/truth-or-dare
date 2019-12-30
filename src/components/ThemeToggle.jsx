import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import WbSunny from '@material-ui/icons/WbSunny';
import { ThemeContext } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleThemeMode() {
    const themeMode = theme === 'light' ? 'dark' : 'light';
    setTheme(themeMode);
    localStorage.setItem('tord_theme', themeMode);
  }

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton onClick={toggleThemeMode} aria-label="toggle">
        <WbSunny color="inherit" />
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;
