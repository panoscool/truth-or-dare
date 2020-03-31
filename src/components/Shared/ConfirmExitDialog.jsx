import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThemeContext } from '../../context/ThemeContext';
import { OptionsContext } from '../../context/OptionsContext';
import { storeClearAll } from '../../config/store';

function ConfirmExitDialog() {
  const history = useHistory();
  const { modal, setModal } = useContext(ThemeContext);
  const { setCategory, setPlayers } = useContext(OptionsContext);

  function handleClose(redirect) {
    if (redirect === 'game') {
      storeClearAll();
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
