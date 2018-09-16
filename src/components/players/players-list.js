import React from "react";

const PlayerList = props => {
  return (
    <div className="list-group">
      <li
        className="list-group-item list-group-item-action"
        onClick={props.deletePlayer}
      >
        {props.playerName}
      </li>
    </div>
  );
};

export default PlayerList;
