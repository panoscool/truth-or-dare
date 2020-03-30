import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThemeContext } from '../../context/ThemeContext';
import { useHistory } from 'react-router';
import { storeRemoveAll } from '../../config/store';

 function ConfirmationDialog() {
   const history = useHistory();
  const { modal, setModal } = useContext(ThemeContext);

  function handleClose(redirect) {
    if (redirect === 'redirect') {
      storeRemoveAll();
      history.push('/')
      setModal(null);
    }
    setModal(null);
  }

  return (
    <div>
      <Dialog
        open={Boolean(modal)}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Exit game?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your game progress will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={() => handleClose('redirect')} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationDialog;