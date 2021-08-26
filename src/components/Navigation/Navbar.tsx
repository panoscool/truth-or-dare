import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AuthMenu from './AuthMenu';
import ThemeToggle from '../Shared/ThemeToggle';
import useTheme from '../../hooks/useTheme';
import useAuthentication from '../../hooks/useAuthentication';
import useGameOptions from '../../hooks/useGameOptions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  pName: {
    textTransform: 'capitalize',
  },
}));

function Navbar() {
  const classes = useStyles();
  const { setModal } = useTheme();
  const history = useHistory();
  const { pathname } = useLocation();
  const { currentPlayer } = useGameOptions();
  const { admin, authenticated, displayName, photoURL } = useAuthentication();

  function handleHomeRedirect() {
    if (pathname === '/game') {
      setModal('ConfirmExitDialog');
    } else {
      history.push('/');
    }
  }

  return (
    <div className={classes.root}>
      <AppBar color="transparent" position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleHomeRedirect}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {currentPlayer ? (
              <Typography className={classes.pName}>{currentPlayer}</Typography>
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
    </div>
  );
}

export default Navbar;
