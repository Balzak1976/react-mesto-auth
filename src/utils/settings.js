export const popupConfig = {
  avatar: {
    name: 'avatar',
    title: 'Обновить аватар',
    btnTitleSaving: 'Сохранить...',
    btnTitle: 'Сохранить',
    btnUnlocker: true,
  },

  profile: {
    name: 'profile',
    title: 'Редактировать профиль',
    btnTitleSaving: 'Сохранить...',
    btnTitle: 'Сохранить',
    btnUnlocker: true,
    inputs: [
      {
        id: 1,
        name: 'name',
        placeholder: 'Имя',
        typeAttribute: 'text',
        minLength: '2',
        maxLength: '40',
      },

      {
        id: 2,
        name: 'about',
        placeholder: 'О себе',
        typeAttribute: 'text',
        minLength: '2',
        maxLength: '200',
      },
    ],
  },

  card: {
    name: 'card',
    title: 'Новое место',
    btnTitleSaving: 'Сохранить...',
    btnTitle: 'Сохранить',
    btnUnlocker: true,
  },

  delCard: {
    name: 'del-card',
    title: 'Вы уверены?',
    btnTitleSaving: 'Да...',
    btnTitle: 'Да',
    btnUnlocker: false,
  },

  image: {
    name: 'zoom-picture',
  },
};

export const authConfig = {
  login: {
    name: 'auth',
    title: 'Вход',
    btnTitleSaving: 'Войти...',
    btnTitle: 'Войти',
    btnUnlocker: true,
  },

  register: {
    name: 'auth',
    title: 'Регистрация',
    btnTitleSaving: 'Зарегистрироваться...',
    btnTitle: 'Зарегистрироваться',
    btnUnlocker: true,
  },
};

export const infoConfig = {
  name: 'info',
  success: {
    text: 'Вы успешно зарегистрировались!',
  },

  fail: {
    text: 'Что-то пошло не так! Попробуйте ещё раз.',
  },
};
