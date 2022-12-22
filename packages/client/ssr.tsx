import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import App from './src/App';

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
