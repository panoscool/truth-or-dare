import React from 'react';

const PlayerList = (props) => {
    return (
        <div className="note">
            <li>{props.playerName} <button onClick={props.deletePlayer}>X</button></li>
        </div>
    );
}

export default PlayerList;