import { useEffect, useState } from 'react'

type LeaderInfo = {
  data: {
    id: number;
    name: string;
    avatar: string;
    result: number;
    aux: number;
  }
};

export const Leaderboard = () => {
  const [data, setData] = useState<LeaderInfo[]>([])
  const [ratingBy, setRatingBy] = useState('result')

  useEffect(() => {
    const fetchServerData = async () => {
      const url = 'https://ya-praktikum.tech/api/v2/leaderboard/19-T9'
      const body = {
        ratingFieldName: ratingBy,
        cursor: 0,
        limit: 10
      }

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      setData(data)
    }

    fetchServerData()
  }, [ratingBy])

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
          <th className='cursor-pointer' onClick={() => setRatingBy('result')}>Результат</th>
          <th className='cursor-pointer' onClick={() => setRatingBy('aux')}>Aux</th>
        </tr>
        </thead>
        <tbody>
        {data.map((leader, index) =>
          <tr key={leader.data.id}>
            <td>{index + 1}</td>
            <td>
              <div className='flex items-center space-x-3'>
                <div className='avatar'>
                  <div className='mask mask-squircle w-12 h-12'>
                    <img src={leader.data.avatar} alt='Avatar' />
                  </div>
                </div>
                <div className='font-bold'>{leader.data.name}</div>
              </div>
            </td>
            <td>{leader.data.result}</td>
            <td>{leader.data.aux}</td>
          </tr>
        )}
        </tbody>
      </table>
      <button className='btn' onClick={handleButtonClick}>Назад</button>
    </div>
  )
}
