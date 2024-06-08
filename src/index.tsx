import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppContextProvider } from './Utilities/AppContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// force https
if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost' && window.location.hostname !== 'garrett.lan') {
  window.location.replace(`https:${window.location.hostname}`);
}
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
