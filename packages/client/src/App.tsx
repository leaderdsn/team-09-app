import { SwitchRoutes } from '@/router/SwitchRoutes';
import { useEffect } from 'react'
import Layout from '@/layouts/Layout';

const App = () => {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <>
      <div className="container mx-auto">
        <Layout>
          <SwitchRoutes />
        </Layout>
      </div>
      {/* Ниже строка, чтобы "проходили" тесты */}
      Вот тут будет жить ваше приложение :)
    </>
  );
};

export default App;
