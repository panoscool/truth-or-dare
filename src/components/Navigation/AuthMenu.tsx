import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useAuthentication from '../../hooks/useAuthentication';

interface Props {
  admin: boolean | null;
  authenticated: boolean | null;
  displayName: any;
  photoURL: string | null;
  setModal: (e: any) => void;
}

function AuthMenu({ admin, authenticated, displayName, photoURL, setModal }: Props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { signout } = useAuthentication();
  const open = Boolean(anchorEl);

  function handleMenu(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(modal: string) {
    // @ts-ignore
    setModal(modal);
    setAnchorEl(null);
  }

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
      return <Avatar alt={displayName} src={photoURL} />;
    } else if (authenticated && !photoURL) {
      return <Avatar alt={displayName} src="/images/user.png" />;
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
        size="large"
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
        {authenticated ? (
          <>
            <MenuItem disabled sx={{ textTransform: 'capitalize' }}>
              {displayName}
            </MenuItem>
            <Divider variant="fullWidth" />
            {admin && <MenuItem onClick={() => handleClose('AdminForm')}>Admin</MenuItem>}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => handleClose('SignInForm')}>Login</MenuItem>
            <MenuItem onClick={() => handleClose('SignUpForm')}>Register</MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}

export default AuthMenu;
