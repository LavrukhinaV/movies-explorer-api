const validationErr = 'Переданы некорректные данные';
const permissionErr = 'Пользователь не может удалить фильм, который он не сохранял';
const movieNotFoundErr = 'Фильм не найден';
const userNotFoundErr = 'Запрашиваемый пользователь не найден';
const emailIsUsedErr = 'Пользователь с таким email уже зарегистрирован';
const unauthorizedErr = 'Необходима авторизация';
const serverErr = 'На сервере произошла ошибка';
const limiterErr = 'Вы превысили лимит в 1000 запросов в час';
const dataErr = 'Неправильные почта или пароль';
const notFoundErr = 'Неправильный адрес';

module.exports = {
  validationErr,
  permissionErr,
  movieNotFoundErr,
  userNotFoundErr,
  emailIsUsedErr,
  unauthorizedErr,
  serverErr,
  limiterErr,
  dataErr,
  notFoundErr,
};
