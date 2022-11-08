import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useGameOptions from '../../hooks/useGameOptions';

function PlayersScore() {
  const { players } = useGameOptions();

  const transformedList = players?.map((obj: any) => {
    return {
      ...(obj as any),
      // @ts-ignore
      total: obj.score.truth + obj.score.dare,
    };
  });

  const sortedList = transformedList.sort((a, b) => b.total - a.total);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Truth</TableCell>
            <TableCell align="right">Dare</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.score.truth}</TableCell>
              <TableCell align="right">{row.score.dare}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PlayersScore;
