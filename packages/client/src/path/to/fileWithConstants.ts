export const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
export const EMAIL_MESSAGE = 'Некорректный email';

export const EMPTY_MESSAGE = 'Поле не может быть пустым';

export const USER_NAME_REGEXP = /^[а-яА-ЯёЁa-zA-Z]+$/;
export const USER_NAME_MESSAGE = 'Поле должно содержать только буквы';
export const USER_NAME_VALUE_MAX_LENGTH = 100;

export const DEFAULT_MAX_LENGTH_MESSAGE = 'Длина не может быть больше';
export const DEFAULT_MIN_LENGTH_MESSAGE = 'Длина не может быть меньше';
export const DEFAULT_MIN_LENGTH_VALUE = 3;

export const PASSWORD_EQUALITY_MESSAGE = 'Новый пароль должен отличаться от старого';
export const PASSWORD_NOT_EQUALITY_MESSAGE = 'Пароль не совпадает';
export const PASSWORD_MIN_LENGTH_VALUE = 6;
export const PASSWORD_MAX_LENGTH_VALUE = 8;

export const NICK_NAME_VALUE_MAX_LENGTH = 40;