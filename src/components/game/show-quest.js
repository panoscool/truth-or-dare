import React from "react";

const ShowQuest = props => {
  // {props.currentQuest ? <div>{props.currentQuest.question}</div> : ''}
  return (
    <div className="show-quest">
      <h2>
        {props.currentPlayer ? <div>Player: {props.currentPlayer}</div> : ""}
      </h2>
      <p />
      <h3>{props.currentType}</h3>
      <p />
      <h3>{props.currentQuest}</h3>
    </div>
  );
};

export default ShowQuest;
