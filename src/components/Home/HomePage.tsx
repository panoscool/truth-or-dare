import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import CategoriesPage from '../Shared/CategoriesPage';
import PlayersPage from '../Players/PlayersPage';
import NavList from './NavList';
import useAuthentication from '../../hooks/useAuthentication';
import useGameOptions from '../../hooks/useGameOptions';
import Layout from '../Layout';
import GameTitle from '../Shared/GameTitle';

function HomePage() {
  const { authenticated, admin } = useAuthentication();
  const { players, setPlayers, category, setCategory } = useGameOptions();

  return (
    <Layout>
      <GameTitle />
      <CategoriesPage label="Game Mode" category={category} setCategory={setCategory} />

      {players.length > 0 ? (
        <Box textAlign="center" mt={4}>
          <Button
            size="large"
            color="primary"
            variant="contained"
            disabled={players.length <= 0}
            component={Link}
            to="/game"
          >
            Play
          </Button>
          <Typography my={4}>
            <MoodIcon fontSize="large" />
          </Typography>
        </Box>
      ) : (
        <Box textAlign="center" mt={4}>
          <Button size="large" color="primary" variant="contained" component={Link} to="/game">
            Quick Play
          </Button>
          <Typography my={4}>- OR -</Typography>
        </Box>
      )}

      <PlayersPage players={players} setPlayers={setPlayers} />

      {!players.length && <NavList authenticated={authenticated} admin={admin} />}

      {!authenticated && (
        <Box py={2} textAlign="center">
          <Typography variant="caption" color="textSecondary">
            * Login to access all categories *
          </Typography>
        </Box>
      )}
    </Layout>
  );
}

export default HomePage;
