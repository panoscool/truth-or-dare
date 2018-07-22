import React from 'react';

const ShowQuest = (props) => {
    return (
    <div className="show-quest">
             {props.currQuest ? <div>{props.currQuest.question}</div> : ''}
          </div>
    );
}

export default ShowQuest;