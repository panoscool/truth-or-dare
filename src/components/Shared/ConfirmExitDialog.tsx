import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { storeClearAll, CLEAR_KEYS } from '../../config/store';
import useGameOptions from '../../hooks/useGameOptions';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConfirmExitDialog({ open, setOpen }: Props) {
  const navigate = useNavigate();
  const { setCategory, setPlayers } = useGameOptions();

  function handleClose() {
    storeClearAll(CLEAR_KEYS);
    setCategory('funny');
    setPlayers([]);
    setOpen(false);
    navigate('/');
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Exit game?</DialogTitle>
      <DialogContent>Your game progress will be lost.</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          No
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmExitDialog;
