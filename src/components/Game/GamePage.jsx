import React, { useContext, useState } from 'react';
import { OptionsContext } from '../../context/OptionsContext';
import { truth, dare } from '../questions';
import ShowQuest from './ShowQuest';
import Buttons from './Buttons';

function GamePage() {
  const { players, category } = useContext(OptionsContext);
  const [state, setState] = useState({
    currentPlayer: 0,
    currentQuest: null,
    currentType: null
  });

  const randomTruth = () => {
    playerTurn();

    const getTruthCategory = truth.filter(t => t.category === category);

    const truthQuest = getTruthCategory.filter(t => !t.appeared);

    const randomNum = Math.floor(Math.random() * truthQuest.length);

    setState({
      currentQuest: truthQuest[randomNum],
      currentType: 'Truth'
    });
    truth[randomNum].appeared = true;
  };

  const randomDare = () => {
    playerTurn();

    const getDareCategory = dare.filter(d => d.category === category);

    const dareQuest = getDareCategory.filter(d => !d.appeared);

    const randomNum = Math.floor(Math.random() * dareQuest.length);

    setState({
      currentQuest: dareQuest[randomNum],
      currentType: 'Dare'
    });
    dare[randomNum].appeared = true;
  };

  const playerTurn = () => {
    let index = state.currentPlayer;
    index = index++

    if (players.length > 0) {
      setState({ currentPlayer: index });
    } else {
      setState({ currentPlayer: 0 });
    }
  };

  return (
    <div>
      <ShowQuest
        currentQuest={state.currentQuest}
        currentType={state.currentType}
        currentPlayer={players[state.currentPlayer]}
      />

      <Buttons randomTruth={randomTruth} randomDare={randomDare}
      />
    </div>
  );
}

export default GamePage;
