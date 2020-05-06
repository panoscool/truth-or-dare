import React, { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AuthMenu from './AuthMenu';
import { AuthContext } from '../../context/AuthContext';
import { OptionsContext } from '../../context/OptionsContext';
import { ThemeContext } from '../../context/ThemeContext';
import ThemeToggle from '../Shared/ThemeToggle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  pName: {
    textTransform: 'capitalize'
  }
}));

function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const { admin, authenticated, displayName, photoURL } = useContext(AuthContext);
  const { setModal } = useContext(ThemeContext);
  const { playerName } = useContext(OptionsContext);

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
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleHomeRedirect}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {playerName ? <Typography className={classes.pName}>{playerName}</Typography> : null}
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
