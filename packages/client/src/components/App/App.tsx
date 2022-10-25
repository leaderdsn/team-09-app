import { useEffect } from 'react'
import './App.sass'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <div className="app">
    <h1>H1: Вот тут будет жить ваше приложение :)</h1>
    <h2 className='app-header'>H2: Вот тут будет жить ваше приложение :)</h2>
    <strong>STRONG: Вот тут будет жить ваше приложение :)</strong>
    <p>DEFAULT: Вот тут будет жить ваше приложение :)</p>
  </div>
}

export default App
