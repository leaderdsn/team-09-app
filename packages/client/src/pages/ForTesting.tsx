import React, { useEffect, useState } from 'react';
import { useSearchUsersQuery } from '@/store/storeApi/storeApi';
import useDebounce from '@/hooks/debounce';

const ForTesting = () => {
  const [text, setText] = useState('');

  const debounce = useDebounce(text);

  const { isLoading, isError, data } = useSearchUsersQuery(debounce, { skip: debounce.length < 3 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  useEffect(() => {
    console.log(debounce);
  }, [debounce]);
  return (
    <div>
      <div className="my-5 flex items-end">
        <div className="form-control mr-2">
          <label className="label">
            <span className="label-text">Guess your age</span>
          </label>
          <label className="input-group input-group-vertical">
            <span>Enter your name</span>
            <input
              type="text"
              placeholder="In English please"
              className="input-bordered input"
              value={text}
              onChange={handleChange}
            />
          </label>
        </div>

        {isError && <p className="text-center text-red-600">Ошибка запроса</p>}
        {isLoading && <p className="label-text my-5">Загрузка...</p>}

        {data && (
          <>
            <div className="form-control mr-2">
              <label className="label">
                <span className="label-text opacity-0">blank</span>
              </label>
              <label className="input-group input-group-vertical">
                <span>Your age</span>
                <input
                  type="text"
                  placeholder="In English please"
                  className="input-bordered input"
                  value={data['age']}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-control mr-2">
              <label className="label">
                <span className="label-text opacity-0">blank</span>
              </label>
              <label className="input-group input-group-vertical">
                <span>Number of the same names</span>
                <input
                  type="text"
                  placeholder="In English please"
                  className="input-bordered input"
                  value={data['count']}
                  onChange={handleChange}
                />
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForTesting;
