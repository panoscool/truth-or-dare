import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useAuthentication from '../../hooks/useAuthentication';

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  userName: {
    textTransform: 'capitalize'
  }
}));

interface Props {
  admin: boolean | null;
  authenticated: boolean | null;
  displayName: any;
  photoURL: string | null;
  setModal: (e: any) => void;
}

function AuthMenu({ admin, authenticated, displayName, photoURL, setModal }: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { signout } = useAuthentication();
  const open = Boolean(anchorEl);

  function handleMenu(event: any) {
    setAnchorEl(event.currentTarget);
  };

  function handleClose(modal: string) {
    // @ts-ignore
    setModal(modal);
    setAnchorEl(null);
  };

  async function handleLogout() {
    try {
      await signout();
      setAnchorEl(null);
    } catch {
      console.error('Failed to log out');
    }

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
            <MenuItem disabled className={classes.userName}>{displayName}</MenuItem>
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
