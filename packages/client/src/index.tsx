import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import startServiceWorker from './startServiceWorker';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
startServiceWorker();
