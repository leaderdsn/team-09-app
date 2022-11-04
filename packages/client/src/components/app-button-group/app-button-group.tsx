import React, { useState } from "react";
import './app-button-group.css'

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
    <div className="btn-group">
      {buttons.map((buttonLabel: string, i) => (
        <button 
          key={i} 
          name={buttonLabel} 
          onClick={(event) => handleClick(event, i)}
          className={i === clickedId ? "btn btn-primary" : "btn"}
        >
          {buttonLabel}
        </button>
      ))}
    </div>
  )
}