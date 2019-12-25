import React from 'react';

const ShowQuest = (props) => {
  // {props.currentQuest ? <div>{props.currentQuest.question}</div> : ''}
  return (
    <div className="show-quest text-center">
      <h2>
        {props.currentPlayer ? <div>{props.currentPlayer.name}</div> : ''}
      </h2>
      <p />
      <h3>{props.currentType}</h3>
      <p />
      <h3>
        {props.currentQuest ? (
          <div>{props.currentQuest.value}</div>
        ) : (
          <div style={{ fontStyle: 'italic', color: 'red' }}>
            <h4>
              Truth or Dare? <br /> Make your move and let the game begin!
            </h4>
          </div>
        )}
      </h3>
    </div>
  );
};

export default ShowQuest;
