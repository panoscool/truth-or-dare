import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Title = styled('h1')`
  background-image: url('/images/tord-bg.gif');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-clip: text;
  text-transform: uppercase;
  text-align: center;
  color: transparent;
  font-size: 2rem;
  line-height: 0.75;
  font-family: cursive, sans-serif;
  letter-spacing: 0.35rem;

  @media (min-width: 600px) {
    font-size: 3rem;
  }
`;

function GameTitle() {
  return (
    <Box py={2}>
      <Title>Truth or Dare</Title>
    </Box>
  );
}

export default GameTitle;
