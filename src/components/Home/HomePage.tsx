import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Paper } from '@material-ui/core';
import Details from '@material-ui/icons/Details';
import CategoriesPage from '../Shared/CategoriesPage';
import PlayersPage from '../Players/PlayersPage';
import NavList from './NavList';
import useTheme from '../../hooks/useTheme';
import useAuthentication from '../../hooks/useAuthentication';
import useGameOptions from '../../hooks/useGameOptions';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  innerBlock: {
    width: 620,
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing(2)
  },
  iconLight: {
    color: theme.palette.grey[400]
  },
  iconDark: {
    color: theme.palette.grey[600]
  }
}));

function HomePage() {
  const classes = useStyles();
  const { theme } = useTheme();
  const { authenticated, admin } = useAuthentication();
  const { players, setPlayers, category, setCategory } = useGameOptions();

  const iconStyle = theme === 'dark' ? classes.iconDark : classes.iconLight;

  return (
    <Paper className={classes.paper}>
      <div className={classes.innerBlock}>
        <div className="title">Truth or Dare</div>
        <div className="animate-categories"><CategoriesPage label="Game Mode" category={category} setCategory={setCategory} /></div>
        <div className="animate-btnPlay">
          {!players.length && (
            <>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className={classes.button}
                component={Link}
                to="/game"
              >
                Quick Play
            </Button>
              <Typography gutterBottom>- OR -</Typography>
            </>
          )}
          {players.length > 0 && (
            <>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className={classes.button}
                disabled={players.length <= 0}
                component={Link}
                to="/game"
              >
                Play
            </Button>
              <Typography><Details className={iconStyle} /></Typography>
            </>
          )}
          <PlayersPage players={players} setPlayers={setPlayers} />
        </div>
        <div className="animate-list">
          {!players.length && (
            <NavList authenticated={authenticated} admin={admin} />
          )}
        </div>
        {!authenticated &&
          <Typography variant='caption' color='textSecondary'>* Login to access all categories *</Typography>}
      </div>
    </Paper>
  );
}

export default HomePage;
