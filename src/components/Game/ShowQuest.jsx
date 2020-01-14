import React from 'react';

function ShowQuest(props) {
  // {props.currentQuest ? <div>{props.currentQuest.question}</div> : ''}
  return (
    <div>
      <h2>
        {props.currentPlayer ? (
          <div>{props.currentPlayer.name}</div>
        ) : (
          'Guest mode'
        )}
      </h2>
      <p />
      <h3>{props.currentType}</h3>
      <p />
      <h3>{props.currentQuest ? props.currentQuest.value : null}</h3>
    </div>
  );
}

export default ShowQuest;
