import React, { useState } from 'react';
import { useSearchUsersQuery } from '@/store/stores/storeApi';
import useDebounce from '@/hooks/debounce';
import { useActions } from '@/hooks/actions';
import { useAppSelector } from '@/hooks/redux';

const ForTesting = () => {
  const [text, setText] = useState('');
  const debounce = useDebounce(text);

  const { isLoading, isError, data } = useSearchUsersQuery(debounce, { skip: debounce.length < 3 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const { setUser, clearUser } = useActions();
  const addToStore = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setUser(data);
  };

  const removeFromStore = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    clearUser();
  };

  const { user } = useAppSelector((state) => state.user);
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
                  value={data.count}
                  onChange={handleChange}
                />
              </label>
            </div>
          </>
        )}
      </div>
      <div className="flex">
        <button className="btn-success btn" onClick={addToStore}>
          Add
        </button>
        <button className="btn-error btn" onClick={removeFromStore}>
          Delete
        </button>
      </div>

      <h2 className="mt-4 text-xl font-black">Store:</h2>
      {user && (
        <>
          <p>{user.name}</p>
          <p>{user.age}</p>
          <p>{user.count}</p>
        </>
      )}
    </div>
  );
};

export default ForTesting;
