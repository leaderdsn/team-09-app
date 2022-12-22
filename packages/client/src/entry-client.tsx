import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import App from './App';
import './styles/index.css';
import startServiceWorker from './startServiceWorker';

//@ts-ignore
// const store = window.__REDUX_STATE__;
//@ts-ignore
// delete window.__REDUX_STATE__;

const renderMethod = import.meta.hot ? render : hydrate;

renderMethod(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement,
);

startServiceWorker();
