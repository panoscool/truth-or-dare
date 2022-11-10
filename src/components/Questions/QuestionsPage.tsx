import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../../config/firebase';
import useAuthentication from '../../hooks/useAuthentication';
import useGameOptions from '../../hooks/useGameOptions';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import CategoriesPage from '../Shared/CategoriesPage';
import Spinner from '../Shared/Spinner';

const PaperWrapper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
}));

function QuestionsPage() {
  const { authenticated, admin } = useAuthentication();
  const { category, setCategory } = useGameOptions();
  const [type, setType] = useState('truth_questions');
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    let unsubscribe = firestore
      .collection(type)
      .where('category', '==', category)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot: any) => {
          const data = snapshot.docs.map((doc: any) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });

          setData(data);
          setLoading(false);
        },
        (err: any) => {
          console.error(err.message);
          setError(err.message);
          setLoading(false);
        },
      );

    return () => {
      unsubscribe();
    };
  }, [category, type]);

  async function deleteQuestion(id: string) {
    try {
      await firestore.collection(type).doc(id).delete();
    } catch (err) {
      console.error((err as any).message);
      setError((err as any).message);
      setLoading(false);
    }
  }

  function dataSelection() {
    const newType = type === 'truth_questions' ? 'dare_questions' : 'truth_questions';
    setType(newType);
  }

  const filteredData = data.filter((item: any) => {
    return item.question.toLowerCase().includes(search.toLowerCase());
  });

  const disabledBtn = !authenticated && !admin;

  if (loading) return <Spinner thickness={2} />;

  return (
    <PaperWrapper>
      <Box textAlign="center" mt={2}>
        <Button
          onClick={dataSelection}
          disabled={loading}
          color={type === 'dare_questions' ? 'primary' : 'secondary'}
          variant="contained"
        >
          Show {type === 'dare_questions' ? 'truth' : 'dare'} questions
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" my={4}>
        <CategoriesPage
          select
          label="Categories"
          row={width > 460}
          value={category}
          setCategory={setCategory}
        />
      </Box>

      <TextField
        name="search"
        label="Search"
        value={search}
        placeholder="Search for questions..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <Typography gutterBottom color="error">
        {error}
      </Typography>

      <List dense>
        {loading ? (
          <Spinner thickness={2} />
        ) : (
          filteredData?.map((q: any) => (
            <ListItem button key={q.id} component={Link} to={`/update/${type}/${q.id}`}>
              <ListItemText
                primary={q.question}
                secondary={format(q.createdAt.toDate(), 'd MMMM yyyy')}
              />
              <ListItemSecondaryAction>
                <IconButton
                  disabled={disabledBtn}
                  edge="end"
                  size="large"
                  aria-label="delete"
                  onClick={() => deleteQuestion(q.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        )}
      </List>
    </PaperWrapper>
  );
}

export default QuestionsPage;
