import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { OptionsContext } from '../../context/OptionsContext';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2)
  },
  table: {
    width: '100%'
  },
  currentPlayer: {
    color: 'green'
  }
}));

function PlayersScore() {
  const classes = useStyles();
  const { players, playerName } = useContext(OptionsContext);

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table
          size="small"
          aria-label="a dense table"
          className={classes.table}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Truth</TableCell>
              <TableCell align="right">Dare</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players &&
              players.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <span
                      className={
                        playerName === row.name ? classes.currentPlayer : null
                      }
                    >
                      {row.name}
                    </span>
                  </TableCell>
                  <TableCell align="right">{row.score.truth}</TableCell>
                  <TableCell align="right">{row.score.dare}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PlayersScore;
