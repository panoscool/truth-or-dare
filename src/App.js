import React from 'react';
import Navbar from './components/Navbar';
import PlayersPage from './components/PlayersPage';
import CategoriesPage from './components/CategoriesPage';
import GamePage from './components/Game/GamePage';

function App() {
  return (
    <div>
      <Navbar />
      <PlayersPage />
      <CategoriesPage />
      <GamePage />
    </div>
  );
}

export default App;
