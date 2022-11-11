import React, { useState } from 'react';
import { ButtonGroupProps } from '../types';
import './ButtonGroup.css';

const ButtonGroup: React.FC<ButtonGroupProps> = ({buttons, buttonClick}) => {
  const [clickedId, setClickedId] = useState(0);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: React.SetStateAction<number>,
  ) => {
    setClickedId(id);
    buttonClick(event);
  };

  return (
    <div className="tabs tabs-boxed">
      {buttons.map((buttonLabel: string, i) => (
        <button
          key={i}
          name={buttonLabel}
          onClick={(event) => handleClick(event, i)}
          className={i === clickedId ? 'tab tab-active' : 'tab'}
        >
          {buttonLabel}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup

