import React from 'react';

const PlayerList = (props) => {
    return (
        <div className="player-list">
            <li>{props.playerName} <button onClick={props.deletePlayer}>x</button></li>
        </div>
    );
}

export default PlayerList;