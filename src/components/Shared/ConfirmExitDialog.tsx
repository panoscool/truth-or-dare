import React from 'react';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { storeClearAll, CLEAR_KEYS } from '../../config/store';
import useTheme from '../../hooks/useTheme';
import useGameOptions from '../../hooks/useGameOptions';

function ConfirmExitDialog() {
  const history = useHistory();
  const { modal, setModal } = useTheme();
  const { setCategory, setPlayers } = useGameOptions();

  function handleClose(redirect: any) {
    if (redirect === 'game') {
      storeClearAll(CLEAR_KEYS);
      setCategory('funny');
      setPlayers([]);
      history.push('/');
      setModal(null);
    }
    setModal(null);
  }

  return (
    <Dialog open={Boolean(modal)} onClose={handleClose} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">Exit game?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Your game progress will be lost.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">No</Button>
        <Button onClick={() => handleClose('game')} color="primary" autoFocus>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmExitDialog;
