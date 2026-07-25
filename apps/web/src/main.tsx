import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './wagmi.js';
import App from './App.js';
import './index.css';

const queryClient = new QueryClient();

const container = document.getElementById('root');
if (!container) {
  throw new Error('Required root element #root not found in document');
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
