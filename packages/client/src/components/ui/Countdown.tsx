import React, { useState, useEffect } from 'react';
import './Countdown.css';

interface Props {
  onFinish: () => void;
}

const Countdown: React.FC<Props> = ({ onFinish }) => {
  const [counter, setCounter] = useState(3);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsShow(!isShow);

      setTimeout(() => {
        if (isShow) {
          setCounter(counter - 1);

          setStyle({
            fontSize: '0',
            opacity: '1',
          });
        } else {
          setStyle({
            fontSize: '40vw',
            opacity: '0',
          });
        }
      }, 20);
    }, 700);
    if (counter === 0) {
      onFinish();
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isShow]);

  const [style, setStyle] = useState({
    fontSize: '0',
    opacity: '1',
  });

  return (
    <>
      <div className="back-wall">

      {isShow ? (
          <span id="countdown-game" style={style} className=''>
            {counter === 0 ? 'PLAY!!' : counter}
          </span>
      ) : null}
      </div>

    </>
  );
};

export default Countdown;
