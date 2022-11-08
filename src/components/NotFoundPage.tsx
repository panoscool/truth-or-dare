import { Link } from 'react-router-dom';
import { Typography, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Home from '@mui/icons-material/Home';

const PaperWrapper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2),
  padding: theme.spacing(2),
}));

function NotFoundPage() {
  return (
    <PaperWrapper>
      <Typography gutterBottom variant="h4">
        Page not found
      </Typography>
      <Typography variant="h6" mb={2}>
        Maybe the link you followed is wrong, mistyped or the page does not exist anymore.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        startIcon={<Home />}
        component={Link}
        to="/"
      >
        Go Home
      </Button>
    </PaperWrapper>
  );
}

export default NotFoundPage;
