import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

function PlayersList({ data, hnandleSelect, handleDelete }) {
  return (
    <List>
      {data &&
        data.map(p => (
          <ListItem button key={p.id} onClick={() => hnandleSelect(p)}>
            <ListItemText primary={p.name.charAt(0).toUpperCase() + p.name.slice(1)} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(p.id)}
              >
                <ClearIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  );
}

export default PlayersList;
