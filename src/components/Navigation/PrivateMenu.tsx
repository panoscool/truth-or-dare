import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AdminForm from '../Authentication/AdminForm';
import { useState } from 'react';

interface Props {
  admin: boolean;
  userName: string | null;
  photoURL: string | null;
  anchorEl: any;
  openMenu: (e: React.MouseEvent<HTMLElement>) => void;
  closeMenu: () => void;
  logout: () => void;
}

function PrivateMenu({ admin, anchorEl, userName, photoURL, openMenu, closeMenu, logout }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        size="large"
        onClick={openMenu}
      >
        {photoURL ? (
          <Avatar alt={userName || 'user'} src={photoURL} />
        ) : (
          <Avatar alt={userName || 'user'} src="/images/user.png" />
        )}
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
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        onClick={closeMenu}
      >
        <MenuItem disabled sx={{ textTransform: 'capitalize' }}>
          {userName}
        </MenuItem>
        <Divider variant="fullWidth" />
        {admin && <MenuItem onClick={() => setOpen(true)}>Admin</MenuItem>}
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>

      <AdminForm open={open} setOpen={setOpen} />
    </div>
  );
}

export default PrivateMenu;
