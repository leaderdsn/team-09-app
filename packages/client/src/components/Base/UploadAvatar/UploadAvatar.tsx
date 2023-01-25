import { useState, useEffect, useRef } from 'react';
import Avatar from '@/components/Base/Avatar';
import { UploadAvatarProps } from '../types';
import './UploadAvatar.css';

const UploadAvatar: React.FC<UploadAvatarProps> = ({
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

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) setImage(files[0]);
  };

  const handleClickAvatar = () => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  return (
    <div className="app-upload-avatar" onClick={handleClickAvatar}>
      <Avatar src={imageURL} />
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

export default UploadAvatar

