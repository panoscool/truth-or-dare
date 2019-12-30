import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ThemeProvider from './context/ThemeContext';
import OptionsProvider from './context/OptionsContext';
import registerServiceWorker from './registerServiceWorker';

const app = (
  <OptionsProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </OptionsProvider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
