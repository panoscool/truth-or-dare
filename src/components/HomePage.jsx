import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import { PlayArrow, ArrowDownward, AddCircleOutline, InfoOutlined } from '@material-ui/icons';
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
  const { players, setPlayers, category, setCategory } = useContext(
    OptionsContext
  );

  return (
    <Paper className={classes.paper}>
      <div className={classes.root}>
        <CategoriesPage category={category} setCategory={setCategory} />
        {!players.length && (
          <>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<PlayArrow />}
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
              variant="outlined"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<PlayArrow />}
              component={Link}
              to="/game"
            >
              Play
            </Button>
            <Typography>
              <ArrowDownward className={classes.icon} />
            </Typography>
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
