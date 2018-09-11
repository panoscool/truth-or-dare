import React from "react";

const PlayerList = props => {
  return (
    <div className="player-list">
      <li onClick={props.deletePlayer}>{props.playerName}</li>
    </div>
  );
};

export default PlayerList;
