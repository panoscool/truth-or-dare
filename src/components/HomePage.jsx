import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Paper, Divider, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Details, AddCircleOutline, InfoOutlined, ListAltOutlined } from '@material-ui/icons';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { OptionsContext } from '../context/OptionsContext';
import CategoriesPage from './CategoriesPage';
import PlayersPage from './Players/PlayersPage';

const useStyles = makeStyles(theme => ({
  paperLight: {
    display: 'flex',
    overflowY: 'auto',
    justifyContent: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(/tord.png)'
  },
  paperDark: {
    display: 'flex',
    overflowY: 'auto',
    justifyContent: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/tord.png)'
  },
  innerBlock: {
    width: 620,
    height: 'calc(100vh - 112px)',
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
  const { theme } = useContext(ThemeContext);
  const { authenticated, admin } = useContext(AuthContext);
  const { players, setPlayers, category, setCategory } = useContext(OptionsContext);

  return (
    <Paper className={theme === 'light' ? classes.paperLight : classes.paperDark}>
      <div className={classes.innerBlock}>
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
          <>
            <Divider />
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button component={Link} to="/create">
                <ListItemIcon>
                  <AddCircleOutline />
                </ListItemIcon>
                <ListItemText primary="Add Questions" />
              </ListItem>
              {authenticated && admin && (
                <ListItem button component={Link} to="/questions">
                  <ListItemIcon>
                    <ListAltOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Questions List" />
                </ListItem>
              )}
              <ListItem button component={Link} to="/information">
                <ListItemIcon>
                  <InfoOutlined />
                </ListItemIcon>
                <ListItemText primary="Information" />
              </ListItem>
            </List>
          </>
        )}
      </div>
    </Paper>
  );
}

export default HomePage;
