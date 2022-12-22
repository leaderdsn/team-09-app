import { Route, Routes } from 'react-router-dom';
import { routes, RoutesList } from './routes';
import Error404 from '../pages/404';

export const SwitchRoutes = () => {
  return (
    <>
      <Routes>
        {routes.map(({ path, Component }: RoutesList) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};
