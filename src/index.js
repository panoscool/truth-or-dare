import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import ThemeProvider from './context/ThemeContext';
import OptionsProvider from './context/OptionsContext';
import * as serviceWorker from './serviceWorker';

const app = (
  <ThemeProvider>
    <OptionsProvider>
      <CssBaseline />
      <App />
    </OptionsProvider>
  </ThemeProvider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
