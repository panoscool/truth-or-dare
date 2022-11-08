import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AuthMenu from './AuthMenu';
import ThemeToggle from '../Shared/ThemeToggle';
import useTheme from '../../hooks/useTheme';
import useAuthentication from '../../hooks/useAuthentication';
import useGameOptions from '../../hooks/useGameOptions';

function Navbar() {
  const { setModal } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentPlayer } = useGameOptions();
  const { admin, authenticated, displayName, photoURL } = useAuthentication();

  function handleHomeRedirect() {
    if (pathname === '/game') {
      setModal('ConfirmExitDialog');
    } else {
      navigate('/');
    }
  }

  return (
    <Box flexGrow={1}>
      <AppBar color="transparent" position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleHomeRedirect}
            size="large"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" flexGrow={1}>
            {currentPlayer ? (
              <Typography textTransform="capitalize">{currentPlayer}</Typography>
            ) : null}
          </Typography>
          <ThemeToggle />
          <AuthMenu
            admin={admin}
            authenticated={authenticated}
            displayName={displayName}
            photoURL={photoURL}
            setModal={setModal}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
