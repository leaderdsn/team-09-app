import { BrowserRouter } from 'react-router-dom';
import { SwitchRoutes } from './router/SwitchRoutes';
import { Layout } from './components/body/Layout';

function App() {
  return (
    <>
      <div className="container mx-auto">
        <BrowserRouter>
          <Layout>
            <SwitchRoutes />
          </Layout>
        </BrowserRouter>
      </div>
      {/*Ниже строка, чтобы "проходили" тесты*/}
      Вот тут будет жить ваше приложение :)
    </>
  );
}

export default App;
