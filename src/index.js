import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import OptionsProvider from './context/OptionsContext';
import registerServiceWorker from './registerServiceWorker';

const app = <OptionsProvider>
  <App />
</OptionsProvider>

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
