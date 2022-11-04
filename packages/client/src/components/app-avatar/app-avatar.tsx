import React from "react";
import noImage from '../../assets/icons/not-allow-photo.svg';
import './app-avatar.css'

export const AppAvatar:React.FC<{src?:string, alt?: string }> = ({ src, alt }) => {

  return (
    <div className="app-avatar">
      <img className={src ? "app-image" : "app-no-image" }
        src={src ? src : noImage}
        alt={alt}
      />
    </div>
  )
}