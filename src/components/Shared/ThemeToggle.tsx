import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import WBSunny from '@mui/icons-material/WbSunny';
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
      <IconButton
        onClick={toggleThemeMode}
        aria-label="Toggle light/dark theme"
        size="large">
        <WBSunny />
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;
