import React from 'react'
import App from './App'
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { store } from '@/store/store';
import './styles/index.css';
import startServiceWorker from './startServiceWorker';

//@ts-ignore
const store = window.__REDUX_STATE__;
console.log(`############___main---12___#######\n`,store);
//@ts-ignore
delete window.__REDUX_STATE__;

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)

startServiceWorker();
