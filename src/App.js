import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { PlayArrow, ArrowDownward } from '@material-ui/icons';
import Navbar from './components/Navbar';
import PlayersPage from './components/PlayersPage';
import CategoriesPage from './components/CategoriesPage';
import GamePage from './components/Game/GamePage';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2)
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  center: {
    textAlign: 'center'
  },
  icon: {
    color: 'grey'
  }
}));

function App() {
  const classes = useStyles();
  const [home, setHome] = useState(true);
  const [players, setPlayers] = useState([]);
  const [category, setCategory] = useState('funny');

  function handleHome() {
    setHome(false);
  }

  function handleBackHome() {
    setHome(true);
  }

  return (
    <div>
      <Navbar onHome={handleBackHome} />
      <Paper className={classes.paper}>
        {home && (
          <div className={classes.center}>
            <CategoriesPage category={category} setCategory={setCategory} />
            {!players.length && (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<PlayArrow />}
                  onClick={handleHome}
                >
                  Play as Guest
                </Button>
                <Typography gutterBottom>OR</Typography>
              </>
            )}
            {players.length > 0 && (
              <>
                <Button
                  disabled={players.length <= 0}
                  variant="outlined"
                  color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<PlayArrow />}
                  onClick={handleHome}
                >
                  Play
                </Button>
                <Typography>
                  <ArrowDownward className={classes.icon} />
                </Typography>
              </>
            )}
            <PlayersPage players={players} setPlayers={setPlayers} />
          </div>
        )}
        {!home && <GamePage category={category} players={players} />}
      </Paper>
    </div>
  );
}

export default App;
