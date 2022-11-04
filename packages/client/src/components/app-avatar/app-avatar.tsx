import React from 'react';
import { EmptyValue } from '@/pages/app-profile/app-profile';
import noImage from '../../assets/icons/not-allow-photo.svg';
import './app-avatar.css';

interface AvatarProps {
  src?: EmptyValue<string>;
  alt?: EmptyValue<string>;
}

export const AppAvatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <div className="app-avatar">
      <img
        className={src ? 'app-image' : 'app-no-image'}
        src={src ? src : noImage}
        alt={alt}
      />
    </div>
  );
};
