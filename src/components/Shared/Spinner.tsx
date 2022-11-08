import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  thickness: number;
}

function Spinner({ thickness }: Props) {
  return (
    <Box textAlign="center" margin={2}>
      <CircularProgress color="inherit" thickness={thickness} />
    </Box>
  );
}

export default Spinner;
