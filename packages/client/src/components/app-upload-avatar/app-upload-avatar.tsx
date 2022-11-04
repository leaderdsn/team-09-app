import { useState, useEffect, useRef } from 'react';
import { BaseEvent, EmptyValue } from '../../pages/app-profile/app-profile';
import { AppAvatar } from '../app-avatar';
import './app-upload-avatar.css';

interface UploadAvatarProps {
  avatar: EmptyValue<string>;
  uploadAvatar: (url: EmptyValue<string>) => void;
}

export const AppUploadAvatar: React.FC<UploadAvatarProps> = ({
  avatar,
  uploadAvatar,
}) => {
  const [image, setImage] = useState<File>();
  const [imageURL, setImageURL] = useState(avatar);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!image) return;
    const newImageUrl: string = URL.createObjectURL(image);
    setImageURL(newImageUrl);
    uploadAvatar(newImageUrl);
  }, [image]);

  const onImageChange = (event: BaseEvent) => {
    const { files } = event.target;
    if (files) setImage(files[0]);
  };

  const handleClickAvatar = () => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  return (
    <div className="app-upload-avatar" onClick={handleClickAvatar}>
      <AppAvatar src={imageURL} />
      <input
        type="file"
        accept="image/*"
        ref={hiddenFileInput}
        onChange={onImageChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};
