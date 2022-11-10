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

  const hasPlayers = players.length > 0;

  return (
    <Layout>
      <GameTitle />

      <Box display="flex" justifyContent="center">
        <CategoriesPage label="Game Mode" value={category} setCategory={setCategory} />
      </Box>

      <Box textAlign="center" mt={4}>
        <Button size="large" color="primary" variant="contained" component={Link} to="/game">
          {hasPlayers ? 'Play' : 'Quick Play'}
        </Button>
        <Typography my={4}>{hasPlayers ? <MoodIcon fontSize="large" /> : '- OR -'}</Typography>
      </Box>

      <PlayersPage players={players} setPlayers={setPlayers} />

      {!hasPlayers && <NavList authenticated={authenticated} admin={admin} />}

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
