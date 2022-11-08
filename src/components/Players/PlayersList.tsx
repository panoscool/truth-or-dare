import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ClearAll from '@mui/icons-material/ClearAll';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
  data: Array<object>;
  handleSelect: (e: any) => void;
  handleDelete: (e: string) => void;
  handleClearList: () => void;
}

function PlayersList({ data, handleSelect, handleDelete, handleClearList }: Props) {
  return (
    <List>
      {data?.length > 0 && (
        <>
          <ListItem>
            <ListItemText primary="Name" />
            <ListItemSecondaryAction>
              <Tooltip placement="left" title="Clear all">
                <IconButton onClick={handleClearList} edge="end" aria-label="clear-all" size="large">
                  <ClearAll />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </>
      )}
      {data?.map((p: any) => (
        <ListItem button key={p.id} onClick={() => handleSelect(p)}>
          <ListItemText primary={<span style={{ textTransform: 'capitalize' }}>{p.name}</span>} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(p.id)}
              size="large">
              <ClearIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default PlayersList;
