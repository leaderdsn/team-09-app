import { AppButtonGroup } from '../../components/app-button-group';
import { AppProfileChange } from "../../components/app-profile-change";
import { AppProfileInfo } from "../../components/app-profile-info";
import { useState } from "react";
import './app-profile.css'

export interface BaseEvent {
  target: Target
}

interface Target {
  name?: any; 
  files?: FileList | null
}

export type Nullable<T> = T | null
export type EmptyValue<T> = T | undefined

export interface ProfileProps {
  data: ProfileData,
  formDataChange?: (formData: ProfileData) => void
}

interface ProfileData {
  avatar: EmptyValue<string>,
  nickName: EmptyValue<string>,
  email: EmptyValue<string>,
  userName: EmptyValue<string>,
  password: EmptyValue<string>,
  
}

export const AppProfile = () => {
  const [isProfileChange, setIsProfileChange] = useState(false)
  
  const dataObj = {
    avatar: '',
    nickName: 'test',
    email: 'test@test.test',
    userName: 'Aleksandr',
    password: 'qwe123',
  }

  const [data, setData] = useState<ProfileData>(dataObj)

  const profileSwitching = (event: BaseEvent) => {
    const { name } = event.target
    
    name === 'Профиль' ? setIsProfileChange(false) : setIsProfileChange(true)
  };

  const changeFormValue = (formData: ProfileData) => {
    setData(formData)
  };

  return (
    <div className="app-profile container">
      <AppButtonGroup 
        buttons={["Профиль", "Изменить профиль"]}
        buttonClick={profileSwitching }
      />
      {
        isProfileChange ? <AppProfileChange data={ data } formDataChange={changeFormValue}/> : <AppProfileInfo data={ data }/>
      }
    </div>
  )
}
