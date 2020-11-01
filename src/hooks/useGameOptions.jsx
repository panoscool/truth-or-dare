import { useContext } from 'react';
import { OptionsContext } from '../context/OptionsContext';

function useGameOptions() {
  return useContext(OptionsContext);
}

export default useGameOptions;