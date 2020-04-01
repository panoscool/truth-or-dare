import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Paper, Divider, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Details, AddCircleOutline, InfoOutlined, ListAltOutlined } from '@material-ui/icons';
import { AuthContext } from '../context/AuthContext';
import { OptionsContext } from '../context/OptionsContext';
import CategoriesPage from './CategoriesPage';
import PlayersPage from './Players/PlayersPage';

const useStyles = makeStyles(theme => ({
  root: {
    width: 620,
    textAlign: 'center'
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2)
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
      <div className={classes.root}>
        <CategoriesPage label="Game Mode" category={category} setCategory={setCategory} />
        {!players.length && (
          <>
            <Button
              variant="outlined"
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
