export const popupConfig = {
  avatar: {
    name: 'avatar',
    title: 'Обновить аватар',
    btnTitleSaving: 'Сохранить...',
    btnTitle: 'Сохранить',
    btnUnlocker: true,
    inputs: [
      {
        id: 1,
        name: 'avatar',
        placeholder: 'Ссылка на картинку',
        typeAttribute: 'url',
        minLength: '2',
        maxLength: '200',
      },
    ],
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
    inputs: [
      {
        id: 1,
        name: 'name',
        placeholder: 'Название',
        typeAttribute: 'text',
        minLength: '2',
        maxLength: '30',
      },

      {
        id: 2,
        name: 'link',
        placeholder: 'Ссылка на картинку',
        typeAttribute: 'url',
        minLength: '2',
        maxLength: '200',
      },
    ],
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
    inputs: [
      {
        id: 1,
        type: 'auth',
        name: 'email',
        placeholder: 'Email',
        typeAttribute: 'email',
      },

      {
        id: 2,
        type: 'auth',
        name: 'password',
        placeholder: 'Пароль',
        typeAttribute: 'password',
        minLength: '6',
        maxLength: '12',
      },
    ],
  },

  register: {
    name: 'auth',
    title: 'Регистрация',
    btnTitleSaving: 'Зарегистрироваться...',
    btnTitle: 'Зарегистрироваться',
    btnUnlocker: true,
    inputs: [
      {
        id: 1,
        type: 'auth',
        name: 'email',
        placeholder: 'Email',
        typeAttribute: 'email',
      },

      {
        id: 2,
        type: 'auth',
        name: 'password',
        placeholder: 'Пароль',
        typeAttribute: 'password',
        minLength: '6',
        maxLength: '12',
      },
    ],
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
