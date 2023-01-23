import { useEffect, useState } from 'react';
//import { LeaderInfo } from './types'
import Services from '@/services/services';

type TLeader = {
  id: number;
  place: number;
  nikname: string;
  result: number;
  aux: number;
  avatar: string;
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

      const response = await Services.getLeaders();
      const params = {
        data: {
          id: 102,
          name: 'Ran',
          avatar: 'https://cspromogame.ru//storage/upload_images/avatars/879.jpg',
          result: 80000,
          aux: 295051,
        },
        ratingFieldName: 'result',
        teamName: '19-T9',
      };
      const paramsLogin={
        login:'qweqwe',
        password:'qwe123'
      }
      const response3 = await Services.login(paramsLogin);
      // const response2 = await Services.getLeaders2(params);
      console.log(`############___Leaderboard---54___#######\n`, response3);
      console.log(`############___Leaderboard---54___#######\n`, response);
      console.log(`############___Leaderboard---55___#######\n`, response2);
      setData(response);
    };

    fetchServerData();
  }, []);

  const handleButtonClick = () => {
    console.log('Покидаем лидерборд');
  };

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
            data.map((leader) => (
              <tr key={leader.id}>
                <td>{leader.place}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={leader.avatar} alt="Avatar" />
                      </div>
                    </div>
                    <div className="font-bold">{leader.nikname}</div>
                  </div>
                </td>
                <td>{leader.result}</td>
                <td>{leader.aux}</td>
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
