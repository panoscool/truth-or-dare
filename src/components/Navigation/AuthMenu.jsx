import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import firebase from '../../config/firebase';

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  }
}));

function AuthMenu({ admin, authenticated, displayName, photoURL, setModal }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  };

  function handleClose(modal) {
    setModal(modal);
    setAnchorEl(null);
  };

  function handleLogout() {
    firebase.auth().signOut();
    setAnchorEl(null);
  }

  function renderAvatar() {
    if (authenticated && photoURL) {
      return <Avatar className={classes.small} alt={displayName} src={photoURL} />;
    } else if (authenticated && !photoURL) {
      return <Avatar className={classes.small} alt={displayName} src='/images/user.png' />;
    } else {
      return <AccountCircle />;
    }
  }

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {renderAvatar()}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {authenticated ?
          <span>
            <MenuItem disabled>{displayName}</MenuItem>
            <Divider variant='fullWidth' />
            {admin && <MenuItem onClick={() => handleClose('AdminForm')}>Admin</MenuItem>}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </span>
          :
          <span>
            <MenuItem onClick={() => handleClose('SignInForm')}>Login</MenuItem>
            <MenuItem onClick={() => handleClose('SignUpForm')}>Register</MenuItem>
          </span>}
      </Menu>
    </div>
  );
}

export default AuthMenu;
