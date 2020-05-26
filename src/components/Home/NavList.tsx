import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Divider, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { AddCircleOutline, InfoOutlined, ListAltOutlined } from '@material-ui/icons';

interface Props {
  admin: boolean | null;
  authenticated: boolean | null;
}

function NavList({ admin, authenticated }: Props) {
  return (
    <Fragment>
      <Divider />
      <List component="nav">
        <ListItem button component={Link} to="/create">
          <ListItemIcon>
            <AddCircleOutline />
          </ListItemIcon>
          <ListItemText primary="Add Questions" />
        </ListItem>
        {authenticated && admin && (
          <ListItem button component={Link} to="/questions">
            <ListItemIcon>
              <ListAltOutlined />
            </ListItemIcon>
            <ListItemText primary="Questions List" />
          </ListItem>
        )}
        <ListItem button component={Link} to="/information">
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText primary="Information" />
        </ListItem>
      </List>
    </Fragment>
  );
}

export default NavList;
