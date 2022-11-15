import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

interface Props {
  thickness?: number;
  size?: 'sm' | 'md' | 'lg';
  type?: 'circular' | 'linear';
}

function Loading({ thickness = 2, size, type }: Props) {
  if (type === 'linear') {
    return (
      <Box my={1}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box textAlign="center" my={2}>
      <CircularProgress color="inherit" thickness={thickness} size={size} />
    </Box>
  );
}

export default Loading;
