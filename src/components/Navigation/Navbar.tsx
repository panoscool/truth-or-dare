import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PrivateMenu from './PrivateMenu';
import ThemeToggle from '../Shared/ThemeToggle';
import useAuthentication from '../../hooks/useAuthentication';
import useGameOptions from '../../hooks/useGameOptions';
import { useState } from 'react';
import PublicMenu from './PublicMenu';
import ConfirmExitDialog from '../Shared/ConfirmExitDialog';

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentPlayer } = useGameOptions();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { admin, authenticated, displayName, photoURL, signout } = useAuthentication();

  function handleOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  async function handleLogout() {
    try {
      await signout();
      setAnchorEl(null);
    } catch {
      console.error('Failed to log out');
    }
  }

  function handleHomeRedirect() {
    if (pathname === '/game') {
      setOpen(true);
    } else {
      navigate('/');
    }
  }

  return (
    <Box flexGrow={1} mb={2}>
      <AppBar color="transparent" position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            size="large"
            onClick={handleHomeRedirect}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" flexGrow={1}>
            {currentPlayer ? (
              <Typography textTransform="capitalize">{currentPlayer}</Typography>
            ) : null}
          </Typography>
          <ThemeToggle />
          {authenticated ? (
            <PrivateMenu
              anchorEl={anchorEl}
              admin={Boolean(admin)}
              userName={displayName}
              photoURL={photoURL}
              openMenu={handleOpen}
              closeMenu={handleClose}
              logout={handleLogout}
            />
          ) : (
            <PublicMenu anchorEl={anchorEl} openMenu={handleOpen} closeMenu={handleClose} />
          )}
        </Toolbar>
      </AppBar>

      <ConfirmExitDialog open={open} setOpen={setOpen} />
    </Box>
  );
}

export default Navbar;
