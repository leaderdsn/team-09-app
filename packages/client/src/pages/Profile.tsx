import { useState } from 'react';
import ButtonGroup from '@/components/Base/ButtonGroup';
import ProfileChange from '@/components/Profile/ProfileChange';
import ProfileInfo from '@/components/Profile/ProfileInfo';
import { ProfileData } from './types';

const Profile = () => {
  const [isProfileChange, setIsProfileChange] = useState(false);

  const dataObj = {
    avatar: '',
    nickName: 'test',
    email: 'test@test.test',
    userName: 'Aleksandr',
    password: 'qwe123',
  };

  const [data, setData] = useState<ProfileData>(dataObj);

  const profileSwitching = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name } = event.target as HTMLButtonElement;

    setIsProfileChange(name !== 'Профиль')
  };

  const changeFormValue = (formData: ProfileData) => {
    setData(formData);
  };

  return (
    <div className="app-profile py-8 min-h-screen">
      <ButtonGroup
        buttons={['Профиль', 'Изменить профиль']}
        buttonClick={profileSwitching}
      />
      {isProfileChange ? (
        <ProfileChange data={data} formDataChange={changeFormValue} />
      ) : (
        <ProfileInfo data={data} />
      )}
    </div>
  );
};

export default Profile

