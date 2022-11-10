import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import WBSunny from '@mui/icons-material/WbSunny';
import useTheme from '../../hooks/useTheme';

function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton onClick={toggleTheme} size="large">
        <WBSunny />
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;
