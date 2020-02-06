import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';
import BubbleChart from '@material-ui/icons/BubbleChart';
import ThemeToggle from '../ThemeToggle';
import AuthMenu from './AuthMenu';
import { AuthContext } from '../../context/AuthContext';
import { OptionsContext } from '../../context/OptionsContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function Navbar() {
  const classes = useStyles();
  const { authenticated, setModal } = useContext(AuthContext);
  const { playerName } = useContext(OptionsContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            component={Link}
            to="/"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {playerName ? playerName : null}
          </Typography>
          <ThemeToggle />
          {playerName ?
            <Tooltip title="Score">
              <IconButton onClick={() => setModal('LeaderboardModal')} edge="start" color="inherit" aria-label="menu">
                <BubbleChart />
              </IconButton>
            </Tooltip> : null}
          <AuthMenu authenticated={authenticated} setModal={setModal} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
