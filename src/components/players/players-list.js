import React from "react";

const PlayerList = props => {
  return (
    <div className="list-group">
      <li
        className="list-group-item list-group-item-action text-center"
        onClick={props.deletePlayer}
      >
        {props.playerName.name}
      </li>
    </div>
  );
};

export default PlayerList;
