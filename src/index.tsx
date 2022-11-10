import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './context/AuthContext';
import OptionsProvider from './context/OptionsContext';
import ThemeProvider from './context/ThemeContext';

const app = (
  <BrowserRouter>
    <AuthProvider>
      <OptionsProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </OptionsProvider>
    </AuthProvider>
  </BrowserRouter>
);

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(app);
