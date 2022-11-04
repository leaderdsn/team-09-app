import { useEffect } from 'react';
import { AppProfile } from './pages/app-profile';
import { themeChange } from 'theme-change';
import DarkLightMode from './components/UI/DarkLightMode';
import ThemeChanger from './components/UI/ThemeChanger';

function App() {
  useEffect(() => {
    themeChange(false);
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
    <div className="app">
      Вот тут будет жить ваше приложение :)
      <div className="navbar bg-base-100">
        <div className="navbar-start"></div>
        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end">
          <div className="mr-2">
            <ThemeChanger />
          </div>
          <DarkLightMode />
        </div>
      </div>
      <AppProfile />
    </div>
  );
}

export default App;
