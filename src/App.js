import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { PlayArrow, ArrowDownward } from '@material-ui/icons';
import Navbar from './components/Navbar';
import PlayersPage from './components/PlayersPage';
import CategoriesPage from './components/CategoriesPage';
import GamePage from './components/GamePage';

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
  const [gameOn, setGameOn] = useState(false);
  const [player, setPlayer] = useState(0);
  const [players, setPlayers] = useState([]);
  const [category, setCategory] = useState('funny');

  function handleHome() {
    setHome(false);
  }

  function handleBackHome() {
    setHome(true);
    setGameOn(false);
  }

  function playerTurn() {
    if (players.length && players.length !== player + 1) {
      setPlayer(player + 1);
    } else {
      setPlayer(0);
    }
  }

  const currentPlayer = !home && players.length && players[player].name;

  return (
    <div>
      <Navbar playerName={currentPlayer} onHome={handleBackHome} />
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
        {!home && (
          <GamePage
            gameOn={gameOn}
            setGameOn={setGameOn}
            category={category}
            players={players}
            playerTurn={playerTurn}
          />
        )}
      </Paper>
    </div>
  );
}

export default App;
