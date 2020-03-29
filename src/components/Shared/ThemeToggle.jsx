import React, { useContext } from 'react';
import Switch from '@material-ui/core/Switch';
import { ThemeContext } from '../../context/ThemeContext';
import { storeSetTheme } from '../../config/store';

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleThemeMode() {
    const themeMode = theme === 'light' ? 'dark' : 'light';
    setTheme(themeMode);
    storeSetTheme(themeMode);
    // localStorage.setItem('tord_theme', themeMode);
  }

  return <Switch edge="end" onClick={toggleThemeMode} checked={theme === 'dark'} />;
}

export default ThemeToggle;
