import { Link } from 'react-router-dom';
import { Typography, Button, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Details } from '@mui/icons-material';
import CategoriesPage from '../Shared/CategoriesPage';
import PlayersPage from '../Players/PlayersPage';
import NavList from './NavList';
import useAuthentication from '../../hooks/useAuthentication';
import useGameOptions from '../../hooks/useGameOptions';

const PaperWrapper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  margin: theme.spacing(2),
  padding: theme.spacing(2),
}));

function HomePage() {
  const { authenticated, admin } = useAuthentication();
  const { players, setPlayers, category, setCategory } = useGameOptions();

  return (
    <PaperWrapper>
      <Box width={640} textAlign="center">
        <div className="title">Truth or Dare</div>
        <div className="animate-categories">
          <CategoriesPage label="Game Mode" category={category} setCategory={setCategory} />
        </div>
        <div className="animate-btnPlay">
          {!players.length && (
            <>
              <Button size="large" color="primary" variant="contained" component={Link} to="/game">
                Quick Play
              </Button>
              <Typography my={2}>- OR -</Typography>
            </>
          )}
          {players.length > 0 && (
            <>
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
              <Typography my={2}>
                <Details />
              </Typography>
            </>
          )}
          <PlayersPage players={players} setPlayers={setPlayers} />
        </div>
        <div className="animate-list">
          {!players.length && <NavList authenticated={authenticated} admin={admin} />}
        </div>
        {!authenticated && (
          <Typography variant="caption" color="textSecondary">
            * Login to access all categories *
          </Typography>
        )}
      </Box>
    </PaperWrapper>
  );
}

export default HomePage;
