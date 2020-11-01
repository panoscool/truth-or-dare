import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function useTheme() {
  return useContext(ThemeContext);
}

export default useTheme;