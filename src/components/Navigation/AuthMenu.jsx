import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Person from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import firebase from '../../config/firebase';

const useStyles = makeStyles(theme => ({
  icon: {
    margin: theme.spacing(-1)
  },
  small: {
    margin: theme.spacing(-1),
    width: theme.spacing(3),
    height: theme.spacing(3),
  }
}));

function AuthMenu({ authenticated, displayName, photoURL, setModal }) {
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

  function renderAvatar() {
    if (authenticated && photoURL) {
      return <Avatar className={classes.small} alt={displayName} src={photoURL} />;
    } else if (authenticated && !photoURL) {
      return <Person className={classes.icon} />;
    } else {
      return <AccountCircle className={classes.icon} />;
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
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {authenticated ?
          <span>
            <MenuItem disabled>{displayName}</MenuItem>
            <MenuItem onClick={() => firebase.auth().signOut()}>Logout</MenuItem>
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
