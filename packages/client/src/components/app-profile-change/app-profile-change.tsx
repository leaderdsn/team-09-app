import { EmptyValue, ProfileProps } from '@/pages/app-profile/app-profile'
import React, { useEffect, useState } from 'react'
import { AppUploadAvatar } from '../app-upload-avatar'
import { useForm, SubmitHandler } from 'react-hook-form'
import './app-profile-change.sass'

type Inputs = {
  nickName: string
  email: string
  userName: string
  newPassword: string
  confirmPassword: string
}

const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
export const AppProfileChange: React.FC<ProfileProps> = ({data, formDataChange}) => {
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>()
  const [avatar, setAvatar] = useState(data.avatar)

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        newPassword: '',
        confirmPassword: '',
      })
    }
  }, [isSubmitSuccessful, data, reset])

  const onSubmit: SubmitHandler<Inputs> = inputData => {
    console.log('datasubmit: ', inputData)
    if (formDataChange)
      formDataChange({
        avatar: avatar,
        ...inputData,
        password: inputData.newPassword ? inputData.newPassword : data.password,
      })
  }

  const uploadAvatar = (url: EmptyValue<string>) => {
    setAvatar(url)
  }

  return (
    <div className="app-profile-change">
      <AppUploadAvatar avatar={avatar} uploadAvatar={uploadAvatar} />
      <form className="app-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="app-form-field">
          <strong>Прозвище</strong>
          <input
            className={`app-form-field-control ${errors.nickName ? 'is-error' : ''}`}
            type="text"
            placeholder="Введите прозвище"
            defaultValue={data.nickName}
            {...register('nickName', {
              required: { value: true, message: 'Поле не может быть пустым' },
              minLength: {
                value: 3,
                message: 'Длина прозвища не может быть меньше 3',
              },
              maxLength: {
                value: 40,
                message: 'Длина прозвища не может быть больше 40',
              },
            })}
          />
        </label>
        {<small className="error-msg">{errors.nickName?.message}</small>}
        <label className="app-form-field">
          <strong>Почта</strong>
          <input
            className={`app-form-field-control ${errors.email ? 'is-error' : ''}`}
            type="text"
            placeholder="Введите электронную почту"
            defaultValue={data.email}
            aria-invalid={errors.email ? "true" : "false"}
            {...register('email', {
              required: { value: true, message: 'Поле не может быть пустым' },
              pattern: { value: EMAIL_REGEXP, message: 'Некорректный email' },
            })}
          />
        </label>
        {<small className="error-msg">{errors.email?.message}</small>}
        <label className="app-form-field">
          <strong>Имя пользователя</strong>
          <input
            className={`app-form-field-control ${errors.userName ? 'is-error' : ''}`}
            type="text"
            placeholder="Введите имя пользователя"
            defaultValue={data.userName}
            {...register('userName', {
              required: { value: true, message: 'Поле не может быть пустым' },
              pattern: {
                value: /^[а-яА-ЯёЁa-zA-Z]+$/,
                message: 'Поле должно содержать только буквы',
              },
              minLength: {
                value: 3,
                message: 'Длина прозвища не может быть меньше 3',
              },
              maxLength: {
                value: 100,
                message: 'Длина прозвища не может быть больше 100',
              },
            })}
          />
        </label>
        {<small className="error-msg">{errors.userName?.message}</small>}
        <label className="app-form-field">
          <strong>Новый пароль</strong>
          <input
            className={`app-form-field-control ${errors.newPassword ? 'is-error' : ''}`}
            type="password"
            placeholder="Введите новый пароль"
            {...register('newPassword', {
              minLength: {
                value: 6,
                message: 'Длина пароля не может быть меньше 6',
              },
              maxLength: {
                value: 8,
                message: 'Длина пароля не может быть больше 8',
              },
              validate: value => {
                return (
                  data.password !== value ||
                  'Новый пароль должен отличаться от старого'
                )
              },
            })}
          />
        </label>
        {<small className="error-msg">{errors.newPassword?.message}</small>}
        <label className="app-form-field">
          <strong>Повторить пароль</strong>
          <input
            className={`app-form-field-control ${errors.confirmPassword ? 'is-error' : ''}`}
            type="password"
            placeholder="Введите новый пароль ещё раз"
            {...register('confirmPassword', {
              validate: value => {
                const { newPassword } = getValues()
                return newPassword === value || 'Пароль не совпадает'
              },
            })}
          />
        </label>
        {<small className="error-msg">{errors.confirmPassword?.message}</small>}
        <div className="app-form-button-panel">
          <button className="btn btn-primary" type="submit">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  )
}
