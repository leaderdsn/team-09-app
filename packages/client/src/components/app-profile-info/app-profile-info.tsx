import { ProfileProps } from "@/pages/app-profile/app-profile";
import React, { useState } from "react";
import { AppAvatar } from "../app-avatar";
import './app-profile-info.sass'

export const AppProfileInfo:React.FC<ProfileProps> = ({ data }) => {

  return (
    <div className="app-profile-info">
      <AppAvatar src={data.avatar} />
      <ul className="app-list">
        <li className="app-list-item">
          <strong className="app-list-item-label">Прозвище</strong>
          <strong>{ data.nickName }</strong>
        </li>
        <li className="app-list-item">
          <strong className="app-list-item-label">Почта</strong>
          <strong>{ data.email }</strong>
        </li>
        <li className="app-list-item">
          <strong className="app-list-item-label">Имя пользователя</strong>
          <strong>{ data.userName }</strong>
        </li>
      </ul>
      <div className="app-profile-info-button-panel">
        <button className="btn" onClick={() => console.log('back')}>Назад</button>
      </div>
    </div>
  )
}