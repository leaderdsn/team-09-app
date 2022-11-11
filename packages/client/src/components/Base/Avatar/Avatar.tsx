import React from 'react';
import noImage from '@/assets/icons/not-allow-photo.svg';
import { AvatarProps } from '../types';
import './Avatar.css';

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <div className="app-avatar bg-neutral-content py-8">
      <img
        className={src ? 'app-image' : 'app-no-image'}
        src={src ? src : noImage}
        alt={alt}
      />
    </div>
  );
};

export default Avatar

