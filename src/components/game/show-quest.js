import React from 'react';

const ShowQuest = (props) => {
  // {props.currQuest ? <div>{props.currQuest.question}</div> : ''} 
    return (
    <div className="show-quest">
        <h3>{props.currPlayer ? <div>Player: {props.currPlayer}</div> : ''}</h3>
        <p />
        {props.currType}
        <p />
        {props.currQuest}
    </div>
    );
}

export default ShowQuest;