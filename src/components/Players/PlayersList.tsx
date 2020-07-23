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
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface Props {
  data: Array<object>;
  handleSelect: (e: any) => void;
  handleDelete: (e: string) => void;
  handleClearList: () => void;
}

function PlayersList({ data, handleSelect, handleDelete, handleClearList }: Props) {
  return (
    <List>
      {data?.length > 0 && <>
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
      <TransitionGroup>
        {data?.map((p: any) => (
          <CSSTransition key={p.id} timeout={300} classNames="fade">
            <ListItem button onClick={() => handleSelect(p)}>
              <ListItemText primary={<span style={{ textTransform: 'capitalize' }}>{p.name}</span>} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(p.id)} >
                  <ClearIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </List>
  );
}

export default PlayersList;
