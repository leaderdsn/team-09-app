import { useState } from 'react'

export const Leaderboard = () => {
  const initialData = [
    {
      id: 100,
      name: 'Paronil',
      avatar: 'https://cspromogame.ru//storage/upload_images/avatars/900.jpg',
      result: 100000
    },
    { id: 101, name: 'Ffila', avatar: 'https://cspromogame.ru//storage/upload_images/avatars/833.jpg', result: 90000 },
    { id: 102, name: 'Ran', avatar: 'https://cspromogame.ru//storage/upload_images/avatars/879.jpg', result: 80000 },
    { id: 103, name: 'Vala', avatar: 'https://cspromogame.ru//storage/upload_images/avatars/913.jpg', result: 70000 },
    { id: 104, name: 'Taran', avatar: 'https://cspromogame.ru//storage/upload_images/avatars/3358.jpg', result: 60000 },
    { id: 105, name: 'Jola', avatar: 'https://cspromogame.ru//storage/upload_images/avatars/826.jpeg', result: 50000 },
    { id: 106, name: 'Ian', avatar: 'https://cspromogame.ru//storage/upload_images/avatars/849.jpg', result: 40000 },
    {
      id: 107,
      name: 'Bringer',
      avatar: 'https://cspromogame.ru//storage/upload_images/avatars/3820.jpg',
      result: 30000
    },
    { id: 108, name: 'Lure', avatar: 'https://cspromogame.ru//storage/upload_images/avatars/817.jpeg', result: 20000 },
    {
      id: 109,
      name: 'Veniamin',
      avatar: 'https://cspromogame.ru//storage/upload_images/avatars/5018.jpg',
      result: 10000
    }
  ]

  const [data] = useState(initialData)

  const handleButtonClick = () => {
    console.log('Покидаем лидерборд')
  }

  return (
    <div className='leaderboard flex flex-col items-center'>
      <h1 className='text-xl'>Таблица лидеров</h1>
      <table className='table w-1/2'>
        <thead>
        <tr>
          <th>Место</th>
          <th>Ник</th>
          <th>Результат</th>
        </tr>
        </thead>
        <tbody>
        {data.map((leader, index) =>
          <tr key={leader.id}>
            <td>{index + 1}</td>
            <td>
              <div className='flex items-center space-x-3'>
                <div className='avatar'>
                  <div className='mask mask-squircle w-12 h-12'>
                    <img src={leader.avatar} alt='Avatar' />
                  </div>
                </div>
                <div className='font-bold'>{leader.name}</div>
              </div>
            </td>
            <td>{leader.result}</td>
          </tr>
        )}
        </tbody>
      </table>
      <button className='btn' onClick={handleButtonClick}>Назад</button>
    </div>
  )
}
