import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { storeClearAll, CLEAR_KEYS } from '../../config/store';
import useTheme from '../../hooks/useTheme';
import useGameOptions from '../../hooks/useGameOptions';

function ConfirmExitDialog() {
  const navigate = useNavigate();
  const { modal, setModal } = useTheme();
  const { setCategory, setPlayers } = useGameOptions();

  function handleClose(redirect: any) {
    if (redirect === 'game') {
      storeClearAll(CLEAR_KEYS);
      setCategory('funny');
      setPlayers([]);
      navigate('/');
      setModal(null);
    }
    setModal(null);
  }

  return (
    <Dialog open={Boolean(modal)} onClose={handleClose} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">Exit game?</DialogTitle>
      <DialogContent>Your game progress will be lost.</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={() => handleClose('game')} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmExitDialog;
