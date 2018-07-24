import React from 'react';

const ShowQuest = (props) => {
  // {props.currQuest ? <div>{props.currQuest.question}</div> : ''} 
    return (
    <div className="show-quest">
        {props.currQuest}
    </div>
    );
}

export default ShowQuest;