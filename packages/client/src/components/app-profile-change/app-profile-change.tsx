import { EmptyValue, ProfileProps } from "@/pages/app-profile/app-profile";
import React, { useState } from "react";
import { AppUploadAvatar } from "../app-upload-avatar";
import './app-profile-change.sass'

export const AppProfileChange:React.FC<ProfileProps> = ({ data, formDataChange}) => {

  const [avatar, setAvatar] = useState(data.avatar);
  const [nickName, setNickName] = useState(data.nickName);
  const [email, setEmail] = useState(data.email);
  const [userName, setUserName] = useState(data.userName);
  const [password, setPassword] = useState(data.password);
  const [newPassword, setNewPassword] = useState(data.newPassword);
  const [repeatPassword, setRepeatPassword] = useState(data.repeatPassword);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if(formDataChange) formDataChange({
      avatar: avatar,
      nickName: nickName,
      email: email,
      userName: userName,
      password: password,
      newPassword: newPassword,
      repeatPassword: repeatPassword,
    });
  };

  const onClickCancel = () => {
    console.log('cancel')
  };

  const handlerUpload = (url:EmptyValue<string>) => {
    setAvatar(url)
  }

  return (
    <div className="app-profile-change">
      <AppUploadAvatar avatar={avatar} uploadAvatar={handlerUpload}/>
      <form className="app-form" method="post" onSubmit={handleSubmit}>
        <label className="app-form-fuild">
          <strong>Прозвище</strong>
          <input 
            className="app-form-fuild-control" 
            type="text" 
            placeholder="Введите прозвище" 
            value={nickName}
            onChange={(event) => setNickName(event.target.value)}
          />
        </label>
        <label className="app-form-fuild">
          <strong>Почта</strong>
          <input 
            className="app-form-fuild-control" 
            type="text" 
            placeholder="Введите электронную почту" 
            value={email}
            onChange={(event) => setEmail(event.target.value)} 
          />
        </label>
        <label className="app-form-fuild">
          <strong>Имя пользователя</strong>
          <input 
            className="app-form-fuild-control" 
            type="text" 
            placeholder="Введите имя пользователя" 
            value={userName}
            onChange={(event) => setUserName(event.target.value)} 
          />
        </label>
        <label className="app-form-fuild">
          <strong>Пароль</strong>
          <input 
            className="app-form-fuild-control" 
            type="password"
            placeholder="Введите пароль" 
            value={password}
            onChange={(event) => setPassword(event.target.value)} 
          />
        </label>
        <label className="app-form-fuild">
          <strong>Новый пароль</strong>
          <input 
            className="app-form-fuild-control" 
            type="password" 
            placeholder="Введите новый пароль" 
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)} 
          />
        </label>
        <label className="app-form-fuild">
          <strong>Повторить пароль</strong>
          <input 
            className="app-form-fuild-control" 
            type="password" 
            placeholder="Введите новый пароль ещё раз" 
            value={repeatPassword}
            onChange={(event) => setRepeatPassword(event.target.value)}
          />
        </label>
        <div className="app-form-button-panel">
          <button className="btn btn-primary" type="submit">Сохранить</button>
          <button className="btn" onClick={onClickCancel}>Отмена</button>
        </div>
      </form>
    </div> 
  )
}