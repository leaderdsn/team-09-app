import React, { useState } from 'react';
import Countdown from '@/components/ui/Countdown';
import Game from '@/pages/Game';

export const GameScreen = () => {
  const [isFirstGame, setIsFirstGame] = useState(true);

  const [onPlay, setOnPlay] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [name, setName] = useState('');
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleCountdownFinish = () => {
    setOnPlay(true);
    setShowGame(false);
  };
  const beginPlay = () => {
    setShowGame(true);
  };

  const endGameEvent = () => {
    setOnPlay(false);
    setIsFirstGame(false);
  };

  return (
    <>
      {!onPlay ? (
        <div className="hero  h-[calc(100vh-160px)] bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="my-5 text-5xl font-bold">
                {isFirstGame ? 'GAME START' : 'GAME OVER'}
              </h1>
              <div className="form-control ">
                <div className="input-group justify-center">
                  <input
                    type="text"
                    id="username-input"
                    placeholder="Username"
                    onChange={(e) => handleChangeName(e)}
                    className="input-bordered input"
                  />
                  <button
                    id="play-button"
                    className="btn "
                    onClick={isFirstGame ? beginPlay : handleCountdownFinish}
                  >
                    {isFirstGame ? 'PLAY' : 'PLAY AGAIN'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showGame ? <Countdown onFinish={handleCountdownFinish} /> : null}
      {onPlay ? <Game playGame={onPlay} endGameEvent={endGameEvent} /> : null}
    </>
  );
};
