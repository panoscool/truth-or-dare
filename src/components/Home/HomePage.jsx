import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Paper } from '@material-ui/core';
import Details from '@material-ui/icons/Details';
import { AuthContext } from '../../context/AuthContext';
import { OptionsContext } from '../../context/OptionsContext';
import CategoriesPage from '../Shared/CategoriesPage';
import PlayersPage from '../Players/PlayersPage';
import NavList from './NavList';

const useStyles = makeStyles(theme => ({
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
  icon: {
    color: 'grey'
  }
}));

function HomePage() {
  const classes = useStyles();
  const { authenticated, admin } = useContext(AuthContext);
  const { players, setPlayers, category, setCategory } = useContext(OptionsContext);

  return (
    <Paper className={classes.paper}>
      <div className={classes.innerBlock}>
        <div className="title">Truth or Dare</div>
        <CategoriesPage label="Game Mode" category={category} setCategory={setCategory} />
        {!players.length && (
          <>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              component={Link}
              to="/game"
            >
              Play as Guest
            </Button>
            <Typography gutterBottom>- OR -</Typography>
          </>
        )}
        {players.length > 0 && (
          <>
            <Button
              disabled={players.length <= 0}
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              component={Link}
              to="/game"
            >
              Play
            </Button>
            <Typography><Details className={classes.icon} /></Typography>
          </>
        )}
        <PlayersPage players={players} setPlayers={setPlayers} />
        {!players.length && (
          <NavList authenticated={authenticated} admin={admin} />
        )}
        {!authenticated &&
          <Typography variant='caption' color='textSecondary'>* Login to access all categories *</Typography>}
      </div>
    </Paper>
  );
}

export default HomePage;
