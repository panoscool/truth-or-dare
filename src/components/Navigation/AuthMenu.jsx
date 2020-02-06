import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Person from '@material-ui/icons/Person';
import firebase from '../../config/firebase';

function AuthMenu({ authenticated, setModal }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  };

  function handleClose(modal) {
    setModal(modal);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {authenticated ? <Person /> : <AccountCircle />}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {authenticated ?
          <MenuItem onClick={() => firebase.auth().signOut()}>Logout</MenuItem>
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
