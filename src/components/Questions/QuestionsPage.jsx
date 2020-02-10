import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from '../../config/firebase';
import { OptionsContext } from '../../context/OptionsContext';
import CategoriesPage from '../CategoriesPage';
import Spinner from '../Shared/Spinner';
import format from 'date-fns/format';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper
  }
}));

function QuestionsPage() {
  const classes = useStyles();
  const { category } = useContext(OptionsContext);
  const [truth, setTruth] = useState([]);
  const [dare, setDare] = useState([]);
  const [data, setData] = useState(true);
  const [state, setState] = useState({
    loading: true,
    error: null
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const t = await firebase
          .firestore()
          .collection('truth_questions')
          .get();
        const d = await firebase
          .firestore()
          .collection('dare_questions')
          .get();

        setTruth(
          t.docs.map(doc => doc.data()).filter(t => t.category === category)
        );
        setDare(
          d.docs.map(doc => doc.data()).filter(d => d.category === category)
        );

        setState({ loading: false });
      } catch (err) {
        setState({
          loading: false,
          error: err
        });
      }
    }

    fetchData();
  }, [category, setTruth, setDare, setState]);

  function dataSelection() {
    setData(!data);
  }

  const questions = data ? truth : dare;

  return (
    <div className={classes.root}>
      <Button color="secondary" variant="contained" onClick={dataSelection}>
        Show {data ? 'truth' : 'dare'} questions
      </Button>
      <CategoriesPage category={category} select={true} />
      {state.loading && <Spinner />}
      <List>
        {questions &&
          questions.map((q, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={q.question}
                secondary={format(q.createdAt.toDate(), 'do LLLL yyyy')}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </div>
  );
}

export default QuestionsPage;
