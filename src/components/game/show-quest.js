import React from "react";

const ShowQuest = props => {
  // {props.currentQuest ? <div>{props.currentQuest.question}</div> : ''}
  return (
    <div className="show-quest">
      <h3>
        {props.currentPlayer ? <div>Player: {props.currentPlayer}</div> : ""}
      </h3>
      <p />
      {props.currentType}
      <p />
      {props.currentQuest}
    </div>
  );
};

export default ShowQuest;
