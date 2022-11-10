import React from 'react';
import Avatar from '@/components/Base/Avatar';
import { ProfileProps } from '@/pages/types';
import './ProfileInfo.css';

const ProfileInfo: React.FC<ProfileProps> = ({ data }) => {
  return (
    <div className="app-profile-info">
      <Avatar src={data.avatar} />
      <ul className="app-list">
        <li className="app-list-item">
          <strong className="app-list-item-label">Прозвище</strong>
          <strong>{data.nickName}</strong>
        </li>
        <li className="app-list-item">
          <strong className="app-list-item-label">Почта</strong>
          <strong>{data.email}</strong>
        </li>
        <li className="app-list-item">
          <strong className="app-list-item-label">Имя пользователя</strong>
          <strong>{data.userName}</strong>
        </li>
      </ul>
    </div>
  );
};

export default ProfileInfo

