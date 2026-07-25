import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Required root element #root not found in document');
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
