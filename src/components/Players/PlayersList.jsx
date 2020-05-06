import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import ClearAll from '@material-ui/icons/ClearAll';
import ClearIcon from '@material-ui/icons/Clear';

function PlayersList({ data, hnandleSelect, handleDelete, handleClearList }) {
  return (
    <List>
      {data && data.length > 0 && <>
        <ListItem>
          <ListItemText primary='Name' />
          <ListItemSecondaryAction>
            <Tooltip placement='left' title="Clear all">
              <IconButton onClick={handleClearList} edge="end" aria-label="clear-all">
                <ClearAll />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </>}
      {data &&
        data.map((p) => (
          <ListItem button key={p.id} onClick={() => hnandleSelect(p)}>
            <ListItemText primary={<span style={{ textTransform: 'capitalize' }}>{p.name}</span>} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(p.id)} >
                <ClearIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  );
}

export default PlayersList;
