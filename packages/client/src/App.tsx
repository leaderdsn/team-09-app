import { useEffect } from 'react'
import { AppProfile } from './pages/app-profile'

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
  return (
    <div className="app">
      <AppProfile />
    </div>
  )
}

export default App
