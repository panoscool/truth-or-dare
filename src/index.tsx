import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import AuthProvider from './context/AuthContext';
import OptionsProvider from './context/OptionsContext';
import ThemeProvider from './context/ThemeContext';
import './index.css';

const app = (
  <BrowserRouter>
    <AuthProvider>
      <OptionsProvider>
        <ThemeProvider>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </OptionsProvider>
    </AuthProvider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
