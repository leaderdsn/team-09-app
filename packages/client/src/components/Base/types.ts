import { EmptyValue } from '@/types/types';

export interface AvatarProps {
  src?: EmptyValue<string>;
  alt?: EmptyValue<string>;
}

export interface UploadAvatarProps {
  avatar: EmptyValue<string>;
  uploadAvatar: (url: EmptyValue<string>) => void;
}

export interface ButtonGroupProps {
  buttons: string[];
  buttonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
