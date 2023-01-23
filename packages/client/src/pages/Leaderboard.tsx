import { useEffect, useState } from 'react';
//import { LeaderInfo } from './types'
import Services from '@/services/services';

type TLeader = {
  data: {
    id: number;
    place: number;
    name: string;
    result: number;
    aux: number;
    avatar: string;
  };
};

const Leaderboard = () => {
  const [data, setData] = useState<TLeader[]>([]);
  const [ratingBy, setRatingBy] = useState('result');

  useEffect(() => {
    const fetchServerData = async () => {
      // const url = 'https://ya-praktikum.tech/api/v2/leaderboard/19-T9'
      // const body = {
      //   ratingFieldName: ratingBy,
      //   cursor: 0,
      //   limit: 10
      // }

      // const response = await fetch(url, {
      //   method: 'POST',
      //   body: JSON.stringify(body),
      //   credentials: 'include',
      //   headers: {
      //     'accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   }
      // })

      // const data = await response.json()

      // setData(data)

      const paramsLogin = {
        login: 'qweqwe',
        password: 'qwe123',
      };
      await Services.login(paramsLogin);
      const params = {
        ratingFieldName: 'result',
        cursor: 0,
        limit: 10,
      };
      const response = await Services.getAllLeaderboard(params);
      setData(response);
    };

    fetchServerData();
  }, []);

  const handleButtonClick = () => {
    console.log('Покидаем лидерборд');
  };

  // @ts-ignore
  return (
    <div className="leaderboard flex flex-col items-center">
      <h1 className="text-xl">Таблица лидеров</h1>
      <table className="table w-1/2">
        <thead>
          <tr>
            <th>Место</th>
            <th>Ник</th>
            <th className="cursor-pointer" onClick={() => setRatingBy('result')}>
              Результат
            </th>
            <th className="cursor-pointer" onClick={() => setRatingBy('aux')}>
              Aux
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((leader, index) => (
              <tr key={leader['data']['id']}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={leader['data']['avatar']} alt="Avatar" />
                      </div>
                    </div>
                    <div className="font-bold">{leader['data']['name']}</div>
                  </div>
                </td>
                <td>{leader['data']['result']}</td>
                <td>{leader['data']['aux']}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button className="btn" onClick={handleButtonClick}>
        Назад
      </button>
    </div>
  );
};

export default Leaderboard;
