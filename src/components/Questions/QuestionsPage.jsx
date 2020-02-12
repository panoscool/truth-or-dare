import React, { useState, useEffect, useContext } from 'react';
import format from 'date-fns/format';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CategoriesPage from '../CategoriesPage';
import Spinner from '../Shared/Spinner';
import { OptionsContext } from '../../context/OptionsContext';
import firebase from '../../config/firebase';

const useStyles = makeStyles(theme => ({
  paper: {
    textAlign: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  button: {
    marginBottom: theme.spacing(2)
  },
  error: {
    color: 'red'
  }
}));

function QuestionsPage() {
  const classes = useStyles();
  const history = useHistory();
  const { category, setCategory } = useContext(OptionsContext);
  const [snapshot, setSnapshot] = useState([]);
  const [url, setUrl] = useState('truth_questions');
  const [state, setState] = useState({
    loading: true,
    error: null
  });

  useEffect(() => {
    setState({ loading: true, error: null });

    let unsubscribe = firebase.firestore().collection(url)
      .where('category', '==', category)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {

        setSnapshot(snapshot);
        setState({ loading: false, error: null });

      }, (err) => {
        console.error(err.message);
        setState({ loading: false, error: err.message });
      });

    return () => {
      unsubscribe();
    };
  }, [category, url]);

  async function deleteQuestion(id) {
    try {
      await firebase.firestore().collection(url).doc(id).delete();
    } catch (err) {
      console.error(err.message);
      setState({ loading: false, error: err.message });
    }
  }

  function dataSelection() {
    const newUrl = url === 'truth_questions' ? 'dare_questions' : 'truth_questions';
    setUrl(newUrl);
  }

  return (
    <Paper className={classes.paper}>
      <Button onClick={dataSelection} disabled={state.loading} color={url === 'dare_questions' ? 'primary' : 'secondary'} variant="contained" className={classes.button}>
        Show {url === 'dare_questions' ? 'truth' : 'dare'} questions
      </Button>
      <CategoriesPage label="Categories" category={category} setCategory={setCategory} select={true} />
      <Typography className={classes.error}>{state.error}</Typography>
      <List dense>
        {state.loading ? <Spinner /> :
          snapshot && snapshot.docs.map((doc) => {
            const d = doc.data();
            return (
              <ListItem button key={doc.id} onClick={() => history.push(`/create/${doc.id}/${url}`)}>
                <ListItemText primary={d.question} secondary={format(d.createdAt.toDate(), 'd MMMM yyyy')} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteQuestion(doc.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
      </List>
    </Paper>
  );
}

export default QuestionsPage;
