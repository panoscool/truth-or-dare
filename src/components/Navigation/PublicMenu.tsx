import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

interface Props {
  anchorEl: any;
  openMenu: (e: React.MouseEvent<HTMLElement>) => void;
  closeMenu: () => void;
}

function PublicMenu({ anchorEl, openMenu, closeMenu }: Props) {
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
        <AccountCircle />
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
        <MenuItem component={Link} to="/login">
          Login
        </MenuItem>
        <MenuItem component={Link} to="/register">
          Register
        </MenuItem>
      </Menu>
    </div>
  );
}

export default PublicMenu;
