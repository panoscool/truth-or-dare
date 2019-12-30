import React from 'react';
import Paper from '@material-ui/core/Paper';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';

function App() {
  return (
    <Paper>
      <Navbar />
      <HomePage />
    </Paper>
  );
}

export default App;
