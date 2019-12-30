import React from 'react';
import Paper from '@material-ui/core/Paper';
import Navbar from './components/Navbar';
import PlayersPage from './components/PlayersPage';
import CategoriesPage from './components/CategoriesPage';
import GamePage from './components/Game/GamePage';

function App() {
  return (
    <Paper>
      <Navbar />
      <PlayersPage />
      <CategoriesPage />
      <GamePage />
    </Paper>
  );
}

export default App;
