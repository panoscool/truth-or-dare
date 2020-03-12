import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ThemeContext } from '../context/ThemeContext';
import { OptionsContext } from '../context/OptionsContext';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

function LeaderboardModal({ ...other }) {
  const classes = useStyles();
  const { players } = useContext(OptionsContext);
  const { modal, setModal } = useContext(ThemeContext);

  function handleClose() {
    setModal(null);
  }

  return (
    <div>
      <Dialog open={Boolean(modal)} onClose={handleClose} {...other} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Leaderboard
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Truth</TableCell>
                  <TableCell align="right">Dare</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players && players.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.score.truth}</TableCell>
                    <TableCell align="right">{row.score.dare}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LeaderboardModal;
