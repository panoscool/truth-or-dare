import React, { useContext } from 'react';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import WBSunny from '@material-ui/icons/WbSunny';
import { ThemeContext } from '../../context/ThemeContext';
import { storeSetTheme } from '../../config/store';

function ThemeToggle({ btnType }) {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleThemeMode() {
    const themeMode = theme === 'light' ? 'dark' : 'light';
    setTheme(themeMode);
    storeSetTheme(themeMode);
  }

  if (btnType === 'switch') {
    return <Switch edge="end" onClick={toggleThemeMode} checked={theme === 'dark'} />;
  }

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton onClick={toggleThemeMode} aria-label="Toggle light/dark theme">
        <WBSunny />
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;
