import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import App from './src/App';
import './src/styles/index.css';

export interface IRenderProps {
  path: string;
  store: any;
}

export const render = ({ path, store }: IRenderProps) => {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </Provider>,
  );
};
