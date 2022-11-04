import React, { useState } from "react";
import './app-button-group.sass'

interface ButtonGroupProps {
  buttons: string[]
  buttonClick: (event: any) => void
}

export const AppButtonGroup:React.FC<ButtonGroupProps> = ({ buttons, buttonClick }) => {

  const [clickedId, setClickedId] = useState(0)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: React.SetStateAction<number>) => {
    setClickedId(id);
    buttonClick(event);
  };

  return (
    <div className="app-button-group">
      {buttons.map((buttonLabel: string, i) => (
        <button 
          key={i} 
          name={buttonLabel} 
          onClick={(event) => handleClick(event, i)}
          className={i === clickedId ? "app-button-group-item active" : "app-button-group-item"}
        >
          {buttonLabel}
        </button>
      ))}
    </div>
  )
}