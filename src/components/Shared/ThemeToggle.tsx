import React from 'react';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import WBSunny from '@material-ui/icons/WbSunny';
import { storeSetTheme } from '../../config/store';
import useTheme from '../../hooks/useTheme';

interface Props {
  btnType?: string;
}

function ThemeToggle({ btnType }: Props) {
  const { theme, setTheme } = useTheme();

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
