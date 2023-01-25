import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as constants from '@/path/to/fileWithConstants'
import UploadAvatar from '@/components/Base/UploadAvatar';
import { EmptyValue } from '@/types/types';
import { ProfileProps } from '@/pages/types';
import { Inputs } from '../types';
import './ProfileChange.css';

const ProfileChange: React.FC<ProfileProps> = ({
  data,
  formDataChange,
}) => {
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>();
  const [avatar, setAvatar] = useState(data.avatar);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [isSubmitSuccessful, data, reset]);

  const onSubmit: SubmitHandler<Inputs> = (inputData) => {
    console.log('datasubmit: ', inputData);
    if (formDataChange)
      formDataChange({
        avatar: avatar,
        ...inputData,
        password: inputData.newPassword ? inputData.newPassword : data.password,
      });
  };

  const uploadAvatar = (url: EmptyValue<string>) => {
    setAvatar(url);
  };

  return (
    <div className="app-profile-change">
      <UploadAvatar avatar={avatar} uploadAvatar={uploadAvatar} />
      <form className="app-form relative flex" onSubmit={handleSubmit(onSubmit)}>
        <label className="app-form-field flex">
          <strong>Прозвище</strong>
          <input
            className={`input-bordered input w-full  ${
              errors.nickName ? 'input-error' : ''
            }`}
            type="text"
            placeholder="Введите прозвище"
            defaultValue={data.nickName}
            {...register('nickName', {
              required: { value: true, message: constants.EMPTY_MESSAGE },
              minLength: {
                value: constants.DEFAULT_MIN_LENGTH_VALUE,
                message: constants.DEFAULT_MIN_LENGTH_MESSAGE  + ' ' + constants.DEFAULT_MIN_LENGTH_VALUE,
              },
              maxLength: {
                value: constants.NICK_NAME_VALUE_MAX_LENGTH,
                message: constants.DEFAULT_MAX_LENGTH_MESSAGE  + ' ' + constants.NICK_NAME_VALUE_MAX_LENGTH,
              },
            })}
          />
        </label>
        {<small className="text-error">{errors.nickName?.message}</small>}
        <label className="app-form-field">
          <strong>Почта</strong>
          <input
            className={`input-bordered input w-full ${
              errors.email ? 'input-error' : ''
            }`}
            type="text"
            placeholder="Введите электронную почту"
            defaultValue={data.email}
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', {
              required: { value: true, message: constants.EMPTY_MESSAGE },
              pattern: { value: constants.EMAIL_REGEXP, message: constants.EMAIL_MESSAGE },
            })}
          />
        </label>
        {<small className="text-error">{errors.email?.message}</small>}
        <label className="app-form-field">
          <strong>Имя пользователя</strong>
          <input
            className={`input-bordered input w-full ${
              errors.userName ? 'input-error' : ''
            }`}
            type="text"
            placeholder="Введите имя пользователя"
            defaultValue={data.userName}
            {...register('userName', {
              required: { value: true, message: constants.EMPTY_MESSAGE },
              pattern: {
                value: constants.USER_NAME_REGEXP,
                message: constants.USER_NAME_MESSAGE,
              },
              minLength: {
                value: constants.DEFAULT_MIN_LENGTH_VALUE,
                message: constants.DEFAULT_MIN_LENGTH_MESSAGE  + ' ' + constants.DEFAULT_MIN_LENGTH_VALUE,
              },
              maxLength: {
                value: constants.USER_NAME_VALUE_MAX_LENGTH,
                message: constants.DEFAULT_MAX_LENGTH_MESSAGE  + ' ' + constants.USER_NAME_VALUE_MAX_LENGTH,
              },
            })}
          />
        </label>
        {<small className="text-error">{errors.userName?.message}</small>}
        <label className="app-form-field">
          <strong>Новый пароль</strong>
          <input
            className={`input-bordered input w-full ${
              errors.newPassword ? 'input-error' : ''
            }`}
            type="password"
            placeholder="Введите новый пароль"
            {...register('newPassword', {
              minLength: {
                value: constants.PASSWORD_MIN_LENGTH_VALUE,
                message: constants.DEFAULT_MIN_LENGTH_MESSAGE + constants.PASSWORD_MIN_LENGTH_VALUE,
              },
              maxLength: {
                value: constants.PASSWORD_MAX_LENGTH_VALUE,
                message: constants.DEFAULT_MAX_LENGTH_MESSAGE  + constants.PASSWORD_MAX_LENGTH_VALUE,
              },
              validate: (value) => {
                return (
                  data.password !== value || constants.PASSWORD_EQUALITY_MESSAGE
                );
              },
            })}
          />
        </label>
        {<small className="text-error">{errors.newPassword?.message}</small>}
        <label className="app-form-field">
          <strong>Повторить пароль</strong>
          <input
            className={`input-bordered input w-full ${
              errors.confirmPassword ? 'input-error' : ''
            }`}
            type="password"
            placeholder="Введите новый пароль ещё раз"
            {...register('confirmPassword', {
              validate: (value) => {
                const { newPassword } = getValues();
                return ( 
                  newPassword === value || constants.PASSWORD_NOT_EQUALITY_MESSAGE 
                );
              },
            })}
          />
        </label>
        {
          <small className="text-error">
            {errors.confirmPassword?.message}
          </small>
        }
        <div className="app-form-button-panel">
          <button className="btn-primary btn" type="submit">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileChange

