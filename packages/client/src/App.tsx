import { BrowserRouter } from 'react-router-dom';
// import { Layout } from './components/body/Layout';
import { store } from '@/store/store';
import { Provider } from "react-redux";
import { SwitchRoutes } from '@/router/SwitchRoutes';
import  Layout  from '@/layouts/Layout';

function App() {
  return (
    <>
      <div className="container mx-auto">
        <Provider store={store}>
          <BrowserRouter>
            <Layout>
              <SwitchRoutes />
            </Layout>
          </BrowserRouter>
        </Provider>
      </div>
      {/*Ниже строка, чтобы "проходили" тесты*/}
      Вот тут будет жить ваше приложение :)
    </>
  );
}

export default App;
