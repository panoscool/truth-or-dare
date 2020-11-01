import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useGameOptions from '../../hooks/useGameOptions';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2)
  },
  table: {
    width: '100%'
  },
  pName: {
    textTransform: 'capitalize'
  }
}));

function PlayersScore() {
  const classes = useStyles();
  const { players } = useGameOptions();

  const transformedList = players?.map((obj: any) => {
    return {
      ...(obj as any),
      // @ts-ignore
      total: obj.score.truth + obj.score.dare
    };
  });

  const sortedList = transformedList.sort((a, b) => b.total - a.total);

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table size="small" className={classes.table}>
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
                <TableCell component="th" scope="row" className={classes.pName}>{row.name}</TableCell>
                <TableCell align="right">{row.score.truth}</TableCell>
                <TableCell align="right">{row.score.dare}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PlayersScore;
